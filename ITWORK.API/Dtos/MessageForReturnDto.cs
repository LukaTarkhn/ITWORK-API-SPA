using System;

namespace ITWORK.API.Dtos
{
    public class MessageForReturnDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string senderKnownAs { get; set; }
        public string SenderPhotoUrl { get; set; }
        public int RecipientId { get; set; }
        public string recipientKnownAs { get; set; }
        public string RecipientPhotoUrl { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }
    }
}