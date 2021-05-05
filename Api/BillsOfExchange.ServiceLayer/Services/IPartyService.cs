using BillsOfExchange.ServiceLayer.Models;

namespace BillsOfExchange.ServiceLayer.Services
{
    public interface IPartyService
    {
        PagedPartyResult GetParties(QueryParameters queryParameters);
        PartyDto GetById(int partyId);
    }
}