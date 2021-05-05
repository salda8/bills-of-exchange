namespace BillsOfExchange.ServiceLayer.Models
{
    public class EndorsementDto
    {
        public int Id { get; set; }

        /// <summary>
        /// Bill the endorsement is attached to
        /// </summary>
        public int BillId { get; set; }

        /// <summary>
        /// New beneficiary entitled to the Bill
        /// </summary>
        public string NewBeneficiary { get; set; }

        /// <summary>
        /// Previous endorsement in the order
        /// Is null when the endorsement is first in the order
        /// </summary>
        public int? PreviousEndorsementId { get; set; }

        public int NewBeneficiaryId { get; set; }
    }
}