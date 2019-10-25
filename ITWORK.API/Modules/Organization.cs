using System;
using System.Collections.Generic;

namespace ITWORK.API.Modules
{
    public class Organization
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public string PublicID { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public ICollection<OrganizationPhoto> OrganizationPhotos { get; set; }
        public ICollection<OrganizationFollow> OrganizationFollows { get; set; }
    }
}