using BillsOfExchange.DataProvider.Collections;
using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.DataProvider.Facades
{
    public interface IPartyFacade : IPartyRepository
    {
        IPagingList GetPageList(int page, int size);
    }
}
