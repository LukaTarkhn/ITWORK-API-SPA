using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using ITWORK.API.Data;
using ITWORK.API.Dtos;
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
        public async Task<IActionResult> GetOrganizations()
        {
            var organizations = await _repo.GetOrganizations();

            var organizationsToReturn = _mapper.Map<IEnumerable<OrganizationForListDto>>(organizations);

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
    }
}