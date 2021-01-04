using BillsOfExchange.DataProvider.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillsOfExchange.Models.Responses
{
    public class BillDetailResponse
    {
        public IEnumerable<Endorsement> Endorsements { get; set; }
        public BillOfExchange Bill { get; set; }
    }
}
