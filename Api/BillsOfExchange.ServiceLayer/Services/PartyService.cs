using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BillsOfExchange.DataProvider.Models;
using BillsOfExchange.ServiceLayer.Exceptions;
using BillsOfExchange.ServiceLayer.Models;
using BillsOfExchange.ServiceLayer.Repositories;

namespace BillsOfExchange.ServiceLayer.Services
{
    public class PartyService : IPartyService
    {
        private readonly IPartyRepositoryWithCount partyRepository;
        private readonly IMapper mapper;

        public PartyService(IPartyRepositoryWithCount partyRepository, IMapper mapper)
        {
            this.partyRepository = partyRepository;
            this.mapper = mapper;
        }

        public PagedPartyResult GetParties(QueryParameters queryParameters)
        {
            IEnumerable<Party> parties = partyRepository.Get(queryParameters.Take, queryParameters.Skip);
            return new PagedPartyResult()
            {
                Content = mapper.Map<IEnumerable<PartyDto>>(parties),
                Pager = new Pager(partyRepository.GetCount(), queryParameters.Take, queryParameters.Skip)
            };
        }

        public PartyDto GetById(int partyId)
        {
            Party party = partyRepository.GetByIds(new List<int>() { partyId }).SingleOrDefault();
            if (party is null)
            {
                throw new NotFoundException($"Party with id:{partyId} not found");
            }

            return mapper.Map<PartyDto>(party);
        }
    }
}