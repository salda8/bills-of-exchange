using BillsOfExchange.DataProvider;

namespace BillsOfExchange.ServiceLayer.Repositories
{
    public interface IBillOfExchangeRepositoryWithCount : IBillOfExchangeRepository
    {
        int GetCount();
    }
}