using BillsOfExchange.DataProvider.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace BillsOfExchange.DataProvider
{
    class AAAAA_BAD_DATA_TEST
    {
        //Nalezeni vsech vadnych dat
        //zakladni predpoklad ze dalsi v rade ma vetsi id nez predchozi....
        public void Load()
        {
            string json = File.ReadAllText("Data/Parties.json");
            var parties = JsonConvert.DeserializeObject<IEnumerable<Party>>(json).OrderBy(item => item.Id).ToList();

            json = File.ReadAllText("Data/BillsOfExchange.json");
            var bills = JsonConvert.DeserializeObject<IEnumerable<BillOfExchange>>(json).OrderBy(item => item.Id).ToList();

            json = File.ReadAllText("Data/Endorsements.json");
            var endos = JsonConvert.DeserializeObject<IEnumerable<Endorsement>>(json).ToList();




            //Řad inodsamentů pro směnku Id=6 zaručeně (mohou být i další případy) obsahuje po sobě jdoucí rupobisy (Id=19 a Id=35) se stejným NewBeneficiaryId=9 (tj. směnku postupuje sám soně)
            var badEndo = new List<Endorsement>();
            foreach (var bill in bills)
            {
                var listEndos = endos.Where(b => b.BillId == bill.Id).OrderBy(b => b.Id).ToArray();
                for (var a = 1; a < listEndos.Count(); a++)
                {
                    if (listEndos[a - 1].NewBeneficiaryId == listEndos[a].NewBeneficiaryId)
                    {
                        badEndo.Add(listEndos[a - 1]);
                        badEndo.Add(listEndos[a]);
                    }
                }
            }

            //První v řadu indosantů pro směnku Id=4 zaručeně (mohou být i další případy) dává NewBeneficiaryId=13 stejné jako BeneficiaryId=13 (tj. směnku postupuje sám sobě)
            var badByBeneficary = endos.Where(a => bills.Single(b => b.Id == a.BillId).BeneficiaryId == a.NewBeneficiaryId).ToList();



            //Řad rubopisů pro směnku Id=8 je zacyklený (z Id=13 vede na Id=70 -> což dojde až k Id=13)
            var cycles = endos.Where(a => a.PreviousEndorsementId != null && a.PreviousEndorsementId > a.Id);


            //Směnka Id=2 má stejného DrawerId=13 jako BeneficiaryId=13 (tj. směnku vystavuje sám sobě)
            var drawerEqualBene = bills.Where(a => a.DrawerId == a.BeneficiaryId);



            var duplicity = new List<Endorsement>();
            //Řad rubopisů pro směnku Id=10 obsahuje 2x rupobis s null předchozím (Id=5 a Id=10).
            foreach (var a in endos.Where(a => a.PreviousEndorsementId == null).GroupBy(a => a.BillId).Where(a => a.Count() > 1))
            {
                foreach (var b in a.Skip(1))
                {
                    duplicity.Add(b);
                }
            }





        }
    }
}
