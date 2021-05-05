namespace BillsOfExchange.ServiceLayer.Models
{
    public class QueryParameters
    {
        public int Take { get; set; } = 20;
        public int Skip { get; set; } = 0;
    }
}