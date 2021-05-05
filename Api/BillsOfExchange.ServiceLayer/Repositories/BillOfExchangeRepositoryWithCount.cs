using System;
using System.Linq;
using BillsOfExchange.DataProvider;

namespace BillsOfExchange.ServiceLayer.Repositories
{
    public class BillOfExchangeRepositoryWithCount : BillOfExchangeRepository, IBillOfExchangeRepositoryWithCount
    {
        private static Lazy<int> count;

        public BillOfExchangeRepositoryWithCount()
        {
            count = new Lazy<int>(() => Get(int.MaxValue, 0).Count());
        }

        public int GetCount()
        {
            return count.Value;
        }
    }
}