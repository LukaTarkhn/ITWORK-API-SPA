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
            // photos
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            // organization
            CreateMap<Organization, OrganizationForListDto>();
            CreateMap<Organization, OrganizationForDetailedDto>();
            CreateMap<Organization, OrganizationForReturnDto>();
            CreateMap<OrganizationForCreationDto, Organization>();
            CreateMap<OrganizationForUpdateDto, Organization>();
        }
    }
}