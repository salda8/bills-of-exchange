namespace BillsOfExchange.ServiceLayer.Models
{
    public class BillOfExchangeDto
    {
        public int Id { get; set; }

        /// <summary>
        /// Party that issued the Bill
        /// </summary>
        public int DrawerId { get; set; }

        /// <summary>
        /// Party that was the Bill issued to
        /// </summary>
        public int BeneficiaryId { get; set; }

        /// <summary>
        /// Amount of goods the Bill represents
        /// </summary>
        public decimal Amount { get; set; }
    }
}