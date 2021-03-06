using System;

namespace ITWORK.API.Dtos
{
    public class OrganizationForReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public int UserId { get; set; }
        public string OrganizationPhotoUrl { get; set; }
        public string OrganizationHeadPhotoUrl { get; set; }
    }
}