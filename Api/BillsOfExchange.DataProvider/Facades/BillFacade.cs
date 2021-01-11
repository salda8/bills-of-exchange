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
            return PagingList<BillGrid>.ToPagingdList(DataSource.GetBills().OrderBy(a=> a.BillId).AsQueryable(), page, size);
        }

        public  IEnumerable<BillDetail> All()
        {
            var fp = new PartyFacade();
            return from a in _billsOfExchange.Value
                   join b in fp.GetAll() on a.BeneficiaryId equals b.Id
                   join c in fp.GetAll() on a.DrawerId equals c.Id
                   orderby a.Id
                   select new BillDetail
                   {
                       Amount = a.Amount,
                       Id = a.Id,
                       BeneficiaryId = a.BeneficiaryId,
                       BeneName = b.Name,
                       DrawerId = a.DrawerId,
                       DrawerName = c.Name

                   };
        }

        public BillDetail GetBill(int billId)
        {
            var bill = All().SingleOrDefault(a => a.Id == billId);
            if (bill == null) return null;

            if (bill.BeneficiaryId == bill.DrawerId)
                throw new ModelDataException("Směnka Id=2 má stejného DrawerId=13 jako BeneficiaryId=13 (tj. směnku vystavuje sám sobě)", bill);

            return bill;
        }

        public IEnumerable<BillDetail> GetBillsByDrawer(int drawerId)
        {
            return All().Where(a => a.DrawerId == drawerId);
        }


        public IEnumerable<BillDetail> GetBillsByOwner(int ownerId)
        {
            var bills = _billsOfExchange.Value.Where(a => a.BeneficiaryId == ownerId).OrderBy(a => a.Id).ToList();
            var fp = new PartyFacade();
            var fo = new EndoFacade();

            var ownEndos = fo.GetByOwner(ownerId);
            var allBillsIdFromEndo = fo.GetAllBillsId();

            bills.RemoveAll(a => allBillsIdFromEndo.Contains(a.Id));
            bills.AddRange(GetByIds(ownEndos.Select(a => a.BillId).ToArray()));
            return from a in bills
                   join b in fp.GetAll() on a.BeneficiaryId equals b.Id
                   join c in fp.GetAll() on a.DrawerId equals c.Id
                   orderby a.Id
                   select new BillDetail
                   {
                       Amount = a.Amount,
                       Id = a.Id,
                       BeneficiaryId = a.BeneficiaryId,
                       BeneName = b.Name,
                       DrawerId = a.DrawerId,
                       DrawerName = c.Name

                   };
        }

        public IEnumerable<BillDetail> GetBillsByOwnerOriginally(int ownerId)
        {
            return All().Where(a => a.BeneficiaryId == ownerId);
        }

    }
}
