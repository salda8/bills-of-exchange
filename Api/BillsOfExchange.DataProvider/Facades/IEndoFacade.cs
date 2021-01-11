using BillsOfExchange.DataProvider.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BillsOfExchange.DataProvider.Facades
{
    public interface IEndoFacade : IEndorsementRepository
    {
        IEnumerable<Endo> GetByBill(BillOfExchange bill);
       
        IEnumerable<Endo> GetByOwner(int ownerId);

        int[] GetAllBillsId();
    }
}
