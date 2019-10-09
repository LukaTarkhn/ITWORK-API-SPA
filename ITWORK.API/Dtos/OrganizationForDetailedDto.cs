using System;

namespace ITWORK.API.Dtos
{
    public class OrganizationForDetailedDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public int UserId { get; set; }
    }
}