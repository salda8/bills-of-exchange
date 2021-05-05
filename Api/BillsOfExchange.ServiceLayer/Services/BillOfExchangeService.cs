using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BillsOfExchange.DataProvider;
using BillsOfExchange.DataProvider.Models;
using BillsOfExchange.ServiceLayer.Exceptions;
using BillsOfExchange.ServiceLayer.Models;
using BillsOfExchange.ServiceLayer.Repositories;

namespace BillsOfExchange.ServiceLayer.Services
{
    public class BillOfExchangeService : IBillOfExchangeService
    {
        private readonly IBillOfExchangeRepositoryWithCount billOfExchangeRepository;
        private readonly IMapper mapper;
        private readonly IPartyRepository partyRepository;
        private readonly IEndorsementRepository endorsementRepository;


        public BillOfExchangeService(IBillOfExchangeRepositoryWithCount billOfExchangeRepository, IMapper mapper,
            IPartyRepository partyRepository,
            IEndorsementRepository endorsementRepository)
        {
            this.billOfExchangeRepository = billOfExchangeRepository;
            this.mapper = mapper;
            this.partyRepository = partyRepository;
            this.endorsementRepository = endorsementRepository;
        }

        public IEnumerable<BillOfExchangeDto> GetBillsByOwner(int ownerId)
        {
            var ownedBills = new List<BillOfExchange>();
            List<BillOfExchange> billsByBeneficiaryId =
                billOfExchangeRepository.GetByBeneficiaryIds(new List<int>() { ownerId })
                    .SelectMany(x => x ?? new List<BillOfExchange>()).ToList();
            ownedBills.AddRange(GetBillsWithoutEndorsements(billsByBeneficiaryId));
            ownedBills.AddRange(GetOwnedBills(ownerId));

            foreach (BillOfExchange bill in ownedBills)
            {
                ValidateBill(bill);
            }

            return mapper.Map<IEnumerable<BillOfExchangeDto>>(ownedBills);

            IEnumerable<BillOfExchange> GetBillsWithoutEndorsements(List<BillOfExchange> bills)
            {
                if (!bills.Any() || bills.FirstOrDefault() == null)
                {
                    return new List<BillOfExchange>();
                }

                IReadOnlyList<IEnumerable<Endorsement>> endorsementsByBillIds =
                    endorsementRepository.GetByBillIds(bills.Select(x => x.Id).ToList());
                bills.RemoveAll(x => endorsementsByBillIds.SelectMany(y => y).Any(y => y.BillId == x.Id));
                return bills;
            }

            IEnumerable<BillOfExchange> GetOwnedBills(int billOwnerId)
            {
                IReadOnlyList<IEnumerable<Endorsement>> endorsementsByBeneficiaryIds =
                    endorsementRepository.GetByNewBeneficiaryIds(new List<int>() { billOwnerId });
                if (!endorsementsByBeneficiaryIds.Any() || endorsementsByBeneficiaryIds.FirstOrDefault() == null)
                {
                    return new List<BillOfExchange>();
                }

                IReadOnlyList<IEnumerable<Endorsement>> endorsementsByBillIds =
                    endorsementRepository.GetByBillIds(endorsementsByBeneficiaryIds.SelectMany(x => x)
                        .Select(x => x.BillId)
                        .Distinct()
                        .ToList());
                List<int> billIds = (from endorsements in endorsementsByBillIds
                    select endorsements.LastOrDefault()
                    into endorsement
                    where endorsement != null && endorsement.NewBeneficiaryId == billOwnerId
                    select endorsement.BillId).ToList();

                return billOfExchangeRepository.GetByIds(billIds);
            }
        }

        public PagedBillOfExchangeResult GetBillsOfExchange(QueryParameters queryParameters)
        {
            IEnumerable<BillOfExchange>
                bills = billOfExchangeRepository.Get(queryParameters.Take, queryParameters.Skip);
            return new PagedBillOfExchangeResult()
            {
                Content = mapper.Map<IEnumerable<BillOfExchangeDto>>(bills),
                Pager = new Pager(billOfExchangeRepository.GetCount(), queryParameters.Take, queryParameters.Skip)
            };
        }

        public IEnumerable<BillOfExchange> GetByDrawerId(int partyId)
        {
            IEnumerable<BillOfExchange> billOfExchanges = billOfExchangeRepository
                .GetByDrawerIds(new List<int>() { partyId })
                .SelectMany(x => x ?? new List<BillOfExchange>()).ToList();

            foreach (BillOfExchange billOfExchange in billOfExchanges)
            {
                ValidateBill(billOfExchange);
            }

            return billOfExchanges;
        }

        public BillOfExchangeWithCurrentOwnerDto GetBillOfExchangeWithCurrentOwner(int billId)
        {
            BillOfExchange bill = billOfExchangeRepository.GetByIds(new[] { billId }).SingleOrDefault();
            if (bill is null)
            {
                throw new NotFoundException($"Bill with id:{billId} not found");
            }

            ValidateBill(bill);

            var billWithOwner = mapper.Map<BillOfExchangeWithCurrentOwnerDto>(bill);
            Party party = partyRepository.GetByIds(new List<int>() { GetCurrentOwner(billWithOwner) })
                .SingleOrDefault();

            if (party != null)
            {
                billWithOwner.OwnerId = party.Id;
                billWithOwner.OwnerName = party.Name;
            }

            return billWithOwner;
        }

        private int GetCurrentOwner(BillOfExchangeDto billId)
        {
            List<Endorsement> endorsementForBill =
                endorsementRepository.GetByBillIds(new List<int>() { billId.Id }).SingleOrDefault()?.ToList();
            if (endorsementForBill != null && endorsementForBill.Any() && endorsementForBill.FirstOrDefault() != null)
            {
                return endorsementForBill.LastOrDefault()!.NewBeneficiaryId;
            }

            return billId.BeneficiaryId;
        }

        private static void ValidateBill(BillOfExchange bill)
        {
            if (bill.BeneficiaryId == bill.DrawerId)
            {
                throw new BillIssuedToItselfException(
                    $"Bill id: {bill.Id} has same beneficiary and drawer id.");
            }
        }
    }
}