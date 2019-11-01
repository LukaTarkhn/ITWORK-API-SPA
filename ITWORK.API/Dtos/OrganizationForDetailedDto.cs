using System;
using System.Collections.Generic;

namespace ITWORK.API.Dtos
{
    public class OrganizationForDetailedDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public int UserId { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotosForDetailedDto> OrganizationPhotos { get; set; }
    }
}