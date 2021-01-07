using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.DataProvider.Models
{
    public class BillInfo
    {
        public int BillId { get; set; }
        public int BillDrawerId { get; set; }
        public int BillBeneficiaryId { get; set; }
        public decimal Amount { get; set; }

        public string BillDrawerName { get; set; }
        public string BillBeneficiaryName { get; set; }

        public string EndoBeneficiaryName { get; set; }
        public int? EndoBeneficiaryId { get; set; }

        public int? EndoId { get; set; }

        public int? EndoCount { get; set; }
    }
}
