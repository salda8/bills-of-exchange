using System.Collections.Generic;
using BillsOfExchange.DataProvider.Models;

namespace BillsOfExchange.DataProvider
{
    public interface IEndorsementRepository
    {
        IEnumerable<Endorsement> Get(int take, int skip);

        IReadOnlyList<Endorsement> GetByIds(IReadOnlyList<int> ids);

        IReadOnlyList<IEnumerable<Endorsement>> GetByBillIds(IReadOnlyList<int> billIds);

        IReadOnlyList<IEnumerable<Endorsement>> GetByNewBeneficiaryIds(IReadOnlyList<int> beneficiaryIds);
    }
}