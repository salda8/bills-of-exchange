using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.Models.Responses
{
    public class Endo
    {
        public int Id { get; set; }

        public int BillId { get; set; }

        public int NewBeneficiaryId { get; set; }

        public int? PreviousEndorsementId { get; set; }

        public Party Bene { get; set; }
    }
}
