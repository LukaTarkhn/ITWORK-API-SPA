using System;

namespace ITWORK.API.Dtos
{
    public class OrganizationPhotoForReturnDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public int OrganizationId { get; set; }
        public int UserId { get; set; }
    }
}