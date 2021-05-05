using System.Collections.Generic;

namespace BillsOfExchange.ServiceLayer.Models
{
    public interface IPaginatedResult<T>
    {
        IEnumerable<T> Content { get; set; }

        Pager Pager { get; set; }
    }
}