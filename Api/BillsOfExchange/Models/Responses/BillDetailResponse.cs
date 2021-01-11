using BillsOfExchange.DataProvider.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillsOfExchange.Models.Responses
{
    public class BillDetailResponse
    {
        public IEnumerable<Endo> Endorsements { get; set; }
        public BillDetail Bill { get; set; }

        public Party Beneficary { get; set; }

        public Party Drawer { get; set; }
    }
}
