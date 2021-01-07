using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.DataProvider.Models
{
    public class PartyDetail : Party
    {

        public IEnumerable<BillOfExchange> Original { get; set; }
        public IEnumerable<BillOfExchange> Actual { get; set; }
    }
}
