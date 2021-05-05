namespace BillsOfExchange.ServiceLayer.Models
{
    public class BillOfExchangeWithCurrentOwnerDto : BillOfExchangeDto
    {   
        public string OwnerName { get; set; }
        public int OwnerId { get; set; }
    }
}