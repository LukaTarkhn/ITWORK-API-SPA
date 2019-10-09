using System;

namespace ITWORK.API.Dtos
{
    public class OrganizationForCreationDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public int UserId { get; set; }
        public OrganizationForCreationDto()
        {
            DateCreated = DateTime.Now;
        }
    }
}