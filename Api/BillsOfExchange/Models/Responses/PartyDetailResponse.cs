using BillsOfExchange.DataProvider.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillsOfExchange.Models.Responses
{
    public class PartyDetailResponse : Party
    {
        public IEnumerable<BillOfExchange> Original { get; set; }
        public IEnumerable<BillOfExchange> Actual { get; set; }
    }
}
