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
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault().Url);
            });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault().Url);
            });
            CreateMap<Photo, PhotosForDetailedDto>();
        }
    }
}