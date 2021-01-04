using BillsOfExchange.DataProvider.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.DataProvider.Facades
{
    public interface IEndoFacade : IEndorsementRepository
    {
        IEnumerable<Endorsement> GetByBill(BillOfExchange bill);
       
        IEnumerable<Endorsement> GetByOwner(int ownerId);

        int[] GetAllBillsId();
    }
}
