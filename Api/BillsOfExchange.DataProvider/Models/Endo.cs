using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.DataProvider.Models
{
    public class Endo : Endorsement
    {
        public Party Bene { get; set; }
    }
}
