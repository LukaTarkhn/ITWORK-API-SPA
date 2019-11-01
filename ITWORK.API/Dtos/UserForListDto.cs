using System;

namespace ITWORK.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastAction { get; set; }
        public string PhotoUrl { get; set; }
    }
}