using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.DataProvider.Collections.PagingLists
{
    interface IPageInfo
    {
        int CurrentPage { get; }
        int TotalPages { get; }
        int PageSize { get; }
        int TotalCount { get; }
        bool HasPrevious { get; }
        bool HasNext { get; }
    }
}
