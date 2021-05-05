using BillsOfExchange.DataProvider;

namespace BillsOfExchange.ServiceLayer.Repositories
{
    public interface IPartyRepositoryWithCount : IPartyRepository
    {
        int GetCount();
    }
}