using System.Collections.Generic;

namespace BillsOfExchange.ServiceLayer.Models
{
    public class PagedPartyResult : IPaginatedResult<PartyDto>
    {
        public IEnumerable<PartyDto> Content { get; set; }
        public Pager Pager { get; set; }
    }
}