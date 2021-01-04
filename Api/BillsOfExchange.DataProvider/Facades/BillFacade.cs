using BillsOfExchange.DataProvider.Collections;
using BillsOfExchange.DataProvider.Exceptions;
using BillsOfExchange.DataProvider.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BillsOfExchange.DataProvider.Facades
{
    public class BillFacade : BillOfExchangeRepository, IBillFacade
    {

        public IPagingList GetPageList(int page, int size)
        {
            return PagingList<BillOfExchange>.ToPagingdList(_billsOfExchange.Value.AsQueryable(), page, size);
        }

        public BillOfExchange GetBill(int billId)
        {
            var bill =_billsOfExchange.Value.SingleOrDefault(a => a.Id == billId);
            if (bill == null) return null;

            if (bill.BeneficiaryId == bill.DrawerId)
                throw new ModelDataException("Směnka Id=2 má stejného DrawerId=13 jako BeneficiaryId=13 (tj. směnku vystavuje sám sobě)", bill);

            return bill;
        }

        public IEnumerable<BillOfExchange> GetBillsByDrawer(int drawerId)
        {
            return _billsOfExchange.Value.Where(a => a.DrawerId == drawerId).OrderBy(a => a.Id);
        }


        //todo do jineho objektu
        public IEnumerable<BillOfExchange> GetBillsByOwner(int ownerId, IEnumerable<Endorsement> ownEndos = null, int[] allBillsIdFromEndo = null)
        {
            var bills = _billsOfExchange.Value.Where(a => a.BeneficiaryId == ownerId).OrderBy(a => a.Id).ToList();
            if (ownEndos == null || allBillsIdFromEndo == null)
                return bills;

            bills.RemoveAll(a => allBillsIdFromEndo.Contains(a.Id));
            bills.AddRange(GetByIds(ownEndos.Select(a => a.BillId).ToArray()));
            return bills;
        }

    }
}
