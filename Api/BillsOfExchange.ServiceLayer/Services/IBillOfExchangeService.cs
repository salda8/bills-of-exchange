using System.Collections.Generic;
using BillsOfExchange.DataProvider.Models;
using BillsOfExchange.ServiceLayer.Models;

namespace BillsOfExchange.ServiceLayer.Services
{
    public interface IBillOfExchangeService
    {
        IEnumerable<BillOfExchangeDto> GetBillsByOwner(int ownerId);

        PagedBillOfExchangeResult GetBillsOfExchange(QueryParameters queryParameters);
        IEnumerable<BillOfExchange> GetByDrawerId(int partyId);
        BillOfExchangeWithCurrentOwnerDto GetBillOfExchangeWithCurrentOwner(int billId);
    }
}