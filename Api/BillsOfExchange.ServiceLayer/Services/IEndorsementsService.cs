using System.Collections.Generic;
using BillsOfExchange.ServiceLayer.Models;

namespace BillsOfExchange.ServiceLayer.Services
{
    public interface IEndorsementsService
    {
        IEnumerable<EndorsementDto> GetEndorsementsForBill(int billId);
    }
}