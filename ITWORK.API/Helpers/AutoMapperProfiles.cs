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

            CreateMap<OrganizationPhoto, OrganizationPhotosForDetailedDto>();
            CreateMap<OrganizationPhoto, OrganizationPhotoForReturnDto>();
            CreateMap<OrganizationPhotoForCreationDto, OrganizationPhoto>();
            
            CreateMap<OrganizationHeadPhoto, OrganizationPhotosForDetailedDto>();
            CreateMap<OrganizationHeadPhoto, OrganizationPhotoForReturnDto>();
            CreateMap<OrganizationPhotoForCreationDto, OrganizationHeadPhoto>();
            // messages
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageForReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt => opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.senderKnownAs, opt => opt.MapFrom(u => u.Sender.Username))
                .ForMember(m => m.recipientKnownAs, opt => opt.MapFrom(u => u.Recipient.Username));
            // organization
            CreateMap<Organization, OrganizationForListDto>()
                .ForMember(dest => dest.OrganizationPhotoUrl, opt => opt.MapFrom(src => src.OrganizationPhotos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.OrganizationHeadPhotoUrl, opt => opt.MapFrom(src => src.OrganizationHeadPhotos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Organization, OrganizationForDetailedDto>()
                .ForMember(dest => dest.OrganizationPhotoUrl, opt => opt.MapFrom(src => src.OrganizationPhotos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.OrganizationHeadPhotoUrl, opt => opt.MapFrom(src => src.OrganizationHeadPhotos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Organization, OrganizationForReturnDto>()
                .ForMember(dest => dest.OrganizationPhotoUrl, opt => opt.MapFrom(src => src.OrganizationPhotos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.OrganizationHeadPhotoUrl, opt => opt.MapFrom(src => src.OrganizationHeadPhotos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<OrganizationForCreationDto, Organization>();
            CreateMap<OrganizationForUpdateDto, Organization>();
            CreateMap<OrganizationFollow, FollowForReturnDto>();
        }
    }
}