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

        
        [HttpGet("{id}", Name = "GetOrganization")]
        public async Task<IActionResult> GetOrganization(int id)
        {
            var orgFromRepo = await _repo.GetOrganization(id);

            var organization = _mapper.Map<OrganizationForDetailedDto>(orgFromRepo);
        
            return Ok(organization);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrganization(int id, OrganizationForUpdateDto organizationForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                            return Unauthorized();

            var organizationFromRepo = await _repo.GetOrganization(id);

            _mapper.Map(organizationForUpdateDto, organizationFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception("Organization update failed on save");
        }


        [HttpPost]
        public async Task<IActionResult> AddOrganizationForUser(OrganizationForCreationDto organizationForCreationDto)
        {
            var userFromRepo = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            organizationForCreationDto.UserId = userFromRepo;
            
            if (organizationForCreationDto.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            if (await _repo.OrgExists(organizationForCreationDto.UserId))
                return BadRequest("Organization already exist");

            var organizationToCreate = _mapper.Map<Organization>(organizationForCreationDto);

            var createdOrganization = await _repo.CreateOrganization(organizationToCreate);

            var organizationToReturn = _mapper.Map<OrganizationForReturnDto>(createdOrganization);

            return CreatedAtRoute("GetOrganization", new {controller = "Organizations", id = createdOrganization.Id}, organizationToReturn);
        }
    }
}