using BillsOfExchange.DataProvider.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace BillsOfExchange.DataProvider
{
    public class DataSource
    {
        protected static readonly Lazy<Endorsement[]> _endorsements = new Lazy<Endorsement[]>(() =>
        {
            string json = File.ReadAllText("Data/Endorsements.json");
            return JsonConvert.DeserializeObject<IEnumerable<Endorsement>>(json).ToArray();
        });

        protected static readonly Lazy<Party[]> _parties = new Lazy<Party[]>(() =>
        {
            string json = File.ReadAllText("Data/Parties.json");
            return JsonConvert.DeserializeObject<IEnumerable<Party>>(json).OrderBy(item => item.Id).ToArray();
        });

        protected static readonly Lazy<BillOfExchange[]> _billsOfExchange = new Lazy<BillOfExchange[]>(() =>
        {
            string json = File.ReadAllText("Data/BillsOfExchange.json");
            return JsonConvert.DeserializeObject<IEnumerable<BillOfExchange>>(json).OrderBy(item => item.Id).ToArray();
        });

        public static IEnumerable<BillInfo> GetMain()
        {
            var parties = _parties.Value;
            var endos = _endorsements.Value.GroupBy(a => a.BillId).SelectMany(a => a.Where(b => b.Id == a.Max(c => c.Id))).ToArray();
            var endoNumber = _endorsements.Value.GroupBy(a => a.BillId).Select(a => new { BillId = a.Key, Count = a.Count() }).ToArray();

            return       from a in _billsOfExchange.Value
                         join d in endos on a.Id equals d.BillId into g
                         from m in g.DefaultIfEmpty()
                         join e in parties on m.NewBeneficiaryId equals e.Id into i
                         from n in i.DefaultIfEmpty()
                         join f in endoNumber on a.Id equals f.BillId into j
                         from o in j.DefaultIfEmpty()
                         join b in parties on a.DrawerId equals b.Id
                         join c in parties on a.BeneficiaryId equals c.Id
                         select new BillInfo
                         {
                             BillId = a.Id,
                             BillDrawerId = a.DrawerId,
                             BillBeneficiaryId = a.BeneficiaryId,
                             Amount = a.Amount,
                             BillDrawerName = b.Name,
                             BillBeneficiaryName = c.Name,
                             EndoBeneficiaryId = m.NewBeneficiaryId,
                             EndoId = m.Id,
                             EndoBeneficiaryName = n.Name,
                             EndoCount = o.Count
                         };
        }

        

            public class PartyInfo
        {

        }
    }


}
