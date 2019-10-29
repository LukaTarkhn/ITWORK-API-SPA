using System.Linq;
using AutoMapper;
using ITWORK.API.Dtos;
using ITWORK.API.Modules;

namespace ITWORK.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // users
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            });
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Follow, FollowForReturnDto>();
            // photos
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            // messages
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageForReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt => opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.senderKnownAs, opt => opt.MapFrom(u => u.Sender.Username))
                .ForMember(m => m.recipientKnownAs, opt => opt.MapFrom(u => u.Recipient.Username));
            // organization
            CreateMap<Organization, OrganizationForListDto>();
            CreateMap<Organization, OrganizationForDetailedDto>();
            CreateMap<Organization, OrganizationForReturnDto>();
            CreateMap<OrganizationForCreationDto, Organization>();
            CreateMap<OrganizationForUpdateDto, Organization>();
            CreateMap<OrganizationFollow, FollowForReturnDto>();
        }
    }
}