using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using ITWORK.API.Data;
using ITWORK.API.Dtos;
using ITWORK.API.Helpers;
using ITWORK.API.Modules;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace ITWORK.API.Controllers
{
    [Authorize]
    [Route("api/users/{userid}/organizations/{organizationid}/photos")]
    [ApiController]
    public class OrganizationPhotosController : ControllerBase
    {
        private readonly IUsersRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public OrganizationPhotosController(IUsersRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account (
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetOrganizationPhoto")]
        public async Task<IActionResult> GetOrganizationPhoto(int id)
        {
            var photoFromRepo = await _repo.GetOrganizationPhoto(id);

            var photo = _mapper.Map<OrganizationPhotoForReturnDto>(photoFromRepo);
        
            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForOrganization(int organizationId, int userId, [FromForm] OrganizationPhotoForCreationDto organizationPhotoForCreationDto)
        {
             if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var organizationFromRepo = await _repo.GetOrganization(userId, organizationId);

            var userFromRepo = await _repo.GetUser(userId);

            if (organizationFromRepo == null)
                return NoContent();

            if (organizationFromRepo.UserId != userId)
                return Unauthorized();

            var file = organizationPhotoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(150).Height(150).Crop("fill")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            organizationPhotoForCreationDto.Url = uploadResult.Uri.ToString();
            organizationPhotoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<OrganizationPhoto>(organizationPhotoForCreationDto);

            if (organizationFromRepo.OrganizationPhotos.Any(u => u.OrganizationId == organizationId))
                await DeletePhoto(organizationId, organizationFromRepo.OrganizationPhotos.Select(u => u.Id).Max(), userId);

            if (!organizationFromRepo.OrganizationPhotos.Any(u => u.IsMain))
                photo.IsMain = true;
            
            organizationFromRepo.OrganizationPhotos.Add(photo);
            userFromRepo.OrganizationPhotos.Add(photo);

            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<OrganizationPhotoForReturnDto>(photo);
                return CreatedAtRoute("GetOrganizationPhoto", new { id = photo.Id}, photoToReturn);
            }

            return BadRequest("Photo not added");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int organizationId, int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var organization = await _repo.GetOrganization(userId, organizationId);

            if (organization == null)
                return NoContent();

            if (organization.UserId != userId)
                return Unauthorized();

            var photoFromRepo = await _repo.GetOrganizationPhoto(id);

            if(photoFromRepo.IsMain)
                return BadRequest("This is already the main photo");

            var currentMainPhoto = await _repo.GetMainPhotoForOrganization(organizationId);
            currentMainPhoto.IsMain = false;

            photoFromRepo.IsMain = true;

            if (await _repo.SaveAll())
                return NoContent();
            
            return BadRequest("Can't set this photo to main");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int organizationId, int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var organization = await _repo.GetOrganization(userId, organizationId);

            if (organization == null)
                return NoContent();

            if (organization.UserId != userId)
                return Unauthorized();

            var photoFromRepo = await _repo.GetOrganizationPhoto(id);

            if (photoFromRepo.PublicID != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicID);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok") {
                    _repo.Delete(photoFromRepo);
                }
            }

            if (photoFromRepo.PublicID == null)
            {
                _repo.Delete(photoFromRepo);
            }

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the photo");
        }
    }
}