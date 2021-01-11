using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.Models.Responses
{
    public class Bill
    {
        public int BillId { get; set; }
        public int BillDrawerId { get; set; }
        public int BillBeneficiaryId { get; set; }
        public decimal Amount { get; set; }
        public string BillDrawerName { get; set; }
        public string BillBeneficiaryName { get; set; }
    }
}
