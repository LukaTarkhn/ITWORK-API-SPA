using System;
using System.Collections.Generic;

namespace ITWORK.API.Modules
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastAction { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Organization> Organizations { get; set; }
        public ICollection<OrganizationPhoto> OrganizationPhotos { get; set; }
        public ICollection<OrganizationHeadPhoto> OrganizationHeadPhotos { get; set; }
        public ICollection<Follow> Followers { get; set; }
        public ICollection<Follow> Followees { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesRecieved { get; set; }
    }
}