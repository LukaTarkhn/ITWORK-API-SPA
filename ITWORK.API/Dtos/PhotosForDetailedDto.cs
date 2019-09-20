using System;

namespace ITWORK.API.Dtos
{
    public class PhotosForDetailedDto
    {    
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime DateAdded { get; set; }
        public int UserId { get; set; }
    }
}