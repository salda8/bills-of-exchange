using BillsOfExchange.DataProvider.Collections;
using BillsOfExchange.DataProvider.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BillsOfExchange.DataProvider.Facades
{
    public class PartyFacade : PartyRepository, IPartyFacade
    {
        public IPagingList GetPageList(int page, int size)
        {
            return PagingList<Party>.ToPagingdList(_parties.Value.AsQueryable(), page, size);
        }
    }
}
