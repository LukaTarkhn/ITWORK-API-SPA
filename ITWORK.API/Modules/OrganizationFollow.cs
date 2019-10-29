namespace ITWORK.API.Modules
{
    public class OrganizationFollow
    {
        public int FollowerId { get; set; }
        public int FolloweeId { get; set; }
        public User Follower { get; set; }
        public Organization Followee { get; set; }
    }
}