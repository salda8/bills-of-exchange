using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.DataProvider.Models
{
    public class BillDetail : BillOfExchange
    {

        public string BeneName { get; set; }
        public string DrawerName { get; set; }
    }
}
