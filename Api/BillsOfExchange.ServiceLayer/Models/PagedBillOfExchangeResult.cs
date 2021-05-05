using System.Collections.Generic;

namespace BillsOfExchange.ServiceLayer.Models
{
    public class PagedBillOfExchangeResult : IPaginatedResult<BillOfExchangeDto>
    {
        public IEnumerable<BillOfExchangeDto> Content { get; set; }
        public Pager Pager { get; set; }
    }
    
}