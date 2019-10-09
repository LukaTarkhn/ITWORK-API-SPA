using System;
using System.Collections.Generic;
using ITWORK.API.Modules;

namespace ITWORK.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastAction { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotosForDetailedDto> Photos { get; set; }
        public ICollection<OrganizationForDetailedDto> Organizations { get; set; }
    }
}