using System;
using System.Collections.Generic;
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
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IUsersRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;

            var users = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Update user {id} failed on save");
        }

        [HttpPost("{id}/follow/{recipientId}")]
        public async Task<IActionResult> FollowUser(int id, int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var follow = await _repo.GetFollow(id, recipientId);

            if (follow != null)
                return BadRequest("You already follow this user");
            
            if (await _repo.GetUser(recipientId) == await _repo.GetUser(id))
                return BadRequest("You can not follow yourself");
            
            if (await _repo.GetUser(recipientId) == null)
                return NotFound();
            
            follow = new Follow
            {
                FollowerId = id,
                FolloweeId = recipientId
            };

            _repo.Add<Follow>(follow);

            if (await _repo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to follow user");
        }

        [HttpDelete("{id}/unfollow/{recipientId}")]
        public async Task<IActionResult> UnfollowUser(int id, int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var follow = await _repo.GetFollow(id, recipientId);

            if (follow == null)
                return BadRequest("You are not followed this user");
            
            if (await _repo.GetUser(recipientId) == null)
                return NotFound();
    
            _repo.Delete(follow);

            if (await _repo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to unfollow user");
        }
    }
}