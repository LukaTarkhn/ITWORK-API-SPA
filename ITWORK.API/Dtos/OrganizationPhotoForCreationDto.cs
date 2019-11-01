using System;
using Microsoft.AspNetCore.Http;

namespace ITWORK.API.Dtos
{
    public class OrganizationPhotoForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }
        public OrganizationPhotoForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}