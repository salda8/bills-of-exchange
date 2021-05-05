using AutoMapper;
using BillsOfExchange.DataProvider.Models;
using BillsOfExchange.ServiceLayer.Models;

namespace BillsOfExchange.ServiceLayer
{
    public class BillOfExchangeProfile : Profile
    {
        public BillOfExchangeProfile()
        {
            CreateMap<Party, PartyDto>().ReverseMap();
            CreateMap<BillOfExchange, BillOfExchangeDto>().ReverseMap();
            CreateMap<BillOfExchange, BillOfExchangeWithCurrentOwnerDto>()
                .ForMember(x => x.OwnerId, expression => expression.Ignore())
                .ForMember(x => x.OwnerName, expression => expression.Ignore());
            CreateMap<Endorsement, EndorsementDto>().ReverseMap();
        }
    }
}