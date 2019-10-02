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
        
    }
}