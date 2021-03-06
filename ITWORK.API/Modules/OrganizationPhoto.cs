using System;

namespace ITWORK.API.Modules
{
    public class OrganizationPhoto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string PublicID { get; set; }
        public Organization Organization { get; set; }
        public int OrganizationId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}