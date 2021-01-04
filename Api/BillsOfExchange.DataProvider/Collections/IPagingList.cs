using BillsOfExchange.DataProvider.Collections.PagingLists;
using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.DataProvider.Collections
{
    public interface IPagingList
    {
        PageInfo PagingInfo { get; }
    }
}
