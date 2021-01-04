using BillsOfExchange.DataProvider.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillsOfExchange.Models.Responses
{
    public class BillsResponse
    {
        public IEnumerable<BillOfExchange> Bills { get; set; }
    }
}
