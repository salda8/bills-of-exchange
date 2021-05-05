using System;
using System.Linq;
using BillsOfExchange.DataProvider;

namespace BillsOfExchange.ServiceLayer.Repositories
{
    public class PartyRepositoryWithCount : PartyRepository, IPartyRepositoryWithCount
    {
        private static Lazy<int> count;

        public PartyRepositoryWithCount()
        {
            count = new Lazy<int>(() => Get(int.MaxValue, 0).Count());
        }

        public int GetCount()
        {
            return count.Value;
        }
    }
}