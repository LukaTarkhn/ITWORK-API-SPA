using System;

namespace ITWORK.API.Modules
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime DateAdded { get; set; }
        public User  User { get; set; }
        public int UserId { get; set; }
    }
}