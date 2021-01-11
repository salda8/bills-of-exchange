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
        BillDetail GetBill(int billId);
        IEnumerable<BillDetail> GetBillsByDrawer(int drawerId);
        IEnumerable<BillDetail> GetBillsByOwner(int ownerId);
        IEnumerable<BillDetail> GetBillsByOwnerOriginally(int ownerId);
    }
}
