using System;
using System.ComponentModel.DataAnnotations;

namespace ITWORK.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(12, MinimumLength = 5, ErrorMessage = "You must specify password between 4 and 12 characters")]
        public string Password { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastAction { get; set; }
        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastAction = DateTime.Now;
        }
    }
}