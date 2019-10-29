using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using ITWORK.API.Data;
using ITWORK.API.Dtos;
using ITWORK.API.Helpers;
using ITWORK.API.Modules;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ITWORK.API.Controllers
{
    [Authorize]
    [Route("api/users/[controller]")]
    [ApiController]
    public class OrganizationsController : ControllerBase
    {
        private readonly IUsersRepository _repo;
        private readonly IMapper _mapper;

        public OrganizationsController(IUsersRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;  
        }

        [HttpGet]
        public async Task<IActionResult> GetOrganizations([FromQuery]OrganizationParams organizationParams)
        {
            var organizations = await _repo.GetOrganizations(organizationParams);

            var organizationsToReturn = _mapper.Map<IEnumerable<OrganizationForListDto>>(organizations);

             Response.AddPagination(organizations.CurrentPage, organizations.PageSize, organizations.TotalCount, organizations.TotalPages);

            return Ok(organizationsToReturn);
        }

        
        [HttpGet("{userId}/{id}", Name = "GetOrganization")]
        public async Task<IActionResult> GetOrganization(int userId, int id)
        {
            var orgFromRepo = await _repo.GetOrganization(userId, id);

            var organization = _mapper.Map<OrganizationForReturnDto>(orgFromRepo);
        
            return Ok(organization);
        }

        [HttpPut("{userId}/{id}")]
        public async Task<IActionResult> UpdateOrganization(int userId, int id, OrganizationForUpdateDto organizationForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                            return Unauthorized();

            var organizationFromRepo = await _repo.GetOrganization(userId, id);

            _mapper.Map(organizationForUpdateDto, organizationFromRepo);

            if (await _repo.SaveAll())
                return Ok();
            
            throw new Exception("Organization update failed on save");
        }

        [HttpPost]
        public async Task<IActionResult> AddOrganizationForUser(OrganizationForCreationDto organizationForCreationDto)
        {
            var userFromRepo = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            organizationForCreationDto.UserId = userFromRepo;
            
            if (userFromRepo != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var organizationToCreate = _mapper.Map<Organization>(organizationForCreationDto);

            if (await _repo.OrgExists(organizationToCreate.Name))
                return BadRequest("Organization with this name already exist");

            var createdOrganization = await _repo.CreateOrganization(organizationToCreate);

            var organizationToReturn = _mapper.Map<OrganizationForReturnDto>(createdOrganization);

            return CreatedAtRoute(new {controller = "Organizations", id = createdOrganization.Id}, organizationToReturn);
        }

        [HttpDelete("{userId}/{id}")]
        public async Task<IActionResult> DeleteOrganization(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var organization = await _repo.GetOrganization(userId, id);

            if (organization == null)
                return BadRequest("This organization is not exist");
            
            if (await _repo.GetUser(userId) == null)
                return NotFound();
    
            _repo.Delete(organization);

            if (await _repo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to delete organization");
        }

        [HttpGet("{userId}/follows/{organizationId}")]
        public async Task<IActionResult> GetOrganizationFollow(int userId, int organizationId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var follow = await _repo.GetOrganizationFollow(userId,organizationId);

            var followToReturn = _mapper.Map<FollowForReturnDto>(follow);

            return Ok(followToReturn);
        }

        [HttpPost("{userId}/follow/{organizationId}")]
        public async Task<IActionResult> FollowOrganization(int userId, int organizationId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var follow = await _repo.GetOrganizationFollow(userId, organizationId);

            if (follow != null)
                return BadRequest("You already follow this organization");
            
            if (await _repo.GetOrganizationById(organizationId) == null)
                return NotFound();
            
            follow = new OrganizationFollow
            {
                FollowerId = userId,
                FolloweeId = organizationId
            };

            _repo.Add<OrganizationFollow>(follow);

            if (await _repo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to follow organization");
        }

        [HttpDelete("{userId}/unfollow/{organizationId}")]
        public async Task<IActionResult> UnfollowOrganization(int userId, int organizationId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var follow = await _repo.GetOrganizationFollow(userId, organizationId);

            if (follow == null)
                return BadRequest("You are not followed this user");
            
            if (await _repo.GetOrganizationById(organizationId) == null)
                return NotFound();
    
            _repo.Delete(follow);

            if (await _repo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to unfollow user");
        }
    }
}