using BillsOfExchange.DataProvider.Collections;
using BillsOfExchange.DataProvider.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.DataProvider.Facades
{
    public interface IBillFacade : IBillOfExchangeRepository
    {

        IPagingList GetPageList(int page, int size);
        BillOfExchange GetBill(int billId);
        IEnumerable<BillOfExchange> GetBillsByDrawer(int drawerId);
        IEnumerable<BillOfExchange> GetBillsByOwner(int ownerId, IEnumerable<Endorsement> endos = null, int[] allBillsIdFromEndo = null);
    }
}
