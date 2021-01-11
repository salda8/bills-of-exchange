using BillsOfExchange.DataProvider.Exceptions;
using BillsOfExchange.DataProvider.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BillsOfExchange.DataProvider.Facades
{
    public class EndoFacade : EndorsementRepository, IEndoFacade
    {

        public IEnumerable<Endo> GetByBill(BillOfExchange bill)
        {
            if (bill == null)
                throw new ArgumentException("bill is empty", "bill");

            var endos = _endorsements.Value.Where(a => a.BillId == bill.Id).OrderBy(a=> a.Id).ToArray();
            for (var a = 1; a < endos.Count(); a++)
                if (endos[a - 1].NewBeneficiaryId == endos[a].NewBeneficiaryId)
                    throw new ModelDataException("Řad inodsamentů pro směnku Id=6 zaručeně (mohou být i další případy) obsahuje po sobě jdoucí rupobisy (Id=19 a Id=35) se stejným NewBeneficiaryId=9 (tj. směnku postupuje sám soně)", endos[a]);

            if (endos.Any(a => bill.BeneficiaryId == a.NewBeneficiaryId))
                throw new ModelDataException("První v řadu indosantů pro směnku Id=4 zaručeně (mohou být i další případy) dává NewBeneficiaryId=13 stejné jako BeneficiaryId=13 (tj. směnku postupuje sám sobě)", bill);

            var cycles = endos.Where(a => a.PreviousEndorsementId != null && a.PreviousEndorsementId > a.Id);
            if (cycles.Count() > 0)
                throw new ModelDataException("Řad rubopisů pro směnku Id=8 je zacyklený (z Id=13 vede na Id=70 -> což dojde až k Id=13)", cycles.First());


            var duplicity = endos.Where(a => a.PreviousEndorsementId == null);
            if (duplicity.Count() > 1)
                throw new ModelDataException("Řad rubopisů pro směnku Id=10 obsahuje 2x rupobis s null předchozím (Id=5 a Id=10).", duplicity.First());

            var pf = new PartyFacade();


            return from a in endos
                   join b in pf.GetByIds(endos.Select(c => c.NewBeneficiaryId).ToArray()) on a.NewBeneficiaryId equals b.Id
                   orderby a.Id
                   select new Endo
                   {
                       Bene = b,
                       Id = a.Id,
                       BillId = a.BillId,
                       NewBeneficiaryId = a.NewBeneficiaryId,
                       PreviousEndorsementId = a.PreviousEndorsementId,
                   };


        }

        public IEnumerable<Endo> GetByOwner(int ownerId)
        {
            var pf = new PartyFacade();
            return from aa in _endorsements.Value.GroupBy(a => a.BillId).SelectMany(a => a.Where(b => b.Id == a.Max(c => c.Id))).Where(a => a.NewBeneficiaryId == ownerId)
                   join bb in pf.GetAll() on aa.NewBeneficiaryId equals bb.Id
                   orderby aa.Id
                   select new Endo
                   {
                       Bene = bb,
                       Id = aa.Id,
                       BillId = aa.BillId,
                       NewBeneficiaryId = aa.NewBeneficiaryId,
                       PreviousEndorsementId = aa.PreviousEndorsementId,
                   };
        }

        public int[] GetAllBillsId()
        {
            return _endorsements.Value.Select(a => a.BillId).Distinct().ToArray();
        }
    }
}
