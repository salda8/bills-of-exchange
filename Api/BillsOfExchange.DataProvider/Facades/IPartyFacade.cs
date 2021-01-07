using BillsOfExchange.DataProvider.Collections;
using BillsOfExchange.DataProvider.Models;

namespace BillsOfExchange.DataProvider.Facades
{
    public interface IPartyFacade : IPartyRepository
    {
        IPagingList GetPageList(int page, int size);
        Party GetOne(int id);
    }
}
