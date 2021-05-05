using System.Collections.Generic;
using System.Linq;
using BillsOfExchange.DataProvider;
using BillsOfExchange.DataProvider.Models;
using BillsOfExchange.ServiceLayer.Exceptions;
using BillsOfExchange.ServiceLayer.Models;

namespace BillsOfExchange.ServiceLayer.Services
{
    public class EndorsementsService : IEndorsementsService
    {
        private readonly IEndorsementRepository endorsementRepository;
        private readonly IPartyRepository partyRepository;
        private readonly IBillOfExchangeRepository billOfExchangeRepository;

        public EndorsementsService(IEndorsementRepository endorsementRepository, IPartyRepository partyRepository,
            IBillOfExchangeRepository billOfExchangeRepository)
        {
            this.endorsementRepository = endorsementRepository;
            this.partyRepository = partyRepository;
            this.billOfExchangeRepository = billOfExchangeRepository;
        }

        public IEnumerable<EndorsementDto> GetEndorsementsForBill(int billId)
        {
            List<EndorsementDto> endorsements =
                (from party in partyRepository.Get(int.MaxValue, 0)
                    join endorsement in endorsementRepository.Get(int.MaxValue, 0) on party.Id equals endorsement
                        .NewBeneficiaryId
                    where endorsement.BillId == billId
                    select new EndorsementDto
                    {
                        NewBeneficiaryId = party.Id,
                        NewBeneficiary = party.Name,
                        Id = endorsement.Id,
                        BillId = endorsement.BillId,
                        PreviousEndorsementId = endorsement.PreviousEndorsementId
                    }).ToList();

            if (!endorsements.Any())
            {
                return new List<EndorsementDto>();
            }

            BillOfExchange bill = billOfExchangeRepository.GetByIds(new List<int> { billId }).Single();
            ValidateEndorsements(billId, endorsements, bill);

            return endorsements;
        }

        private static void ValidateEndorsements(int billId, IReadOnlyList<EndorsementDto> endorsements,
            BillOfExchange bill)
        {
            int endorsementCount = endorsements.Count();
            for (var a = 0; a < endorsementCount; a++)
            {
                EndorsementDto endorsementDto = endorsements[a];
                if (a == 0 && endorsementDto.NewBeneficiaryId == bill.BeneficiaryId)
                {
                    throw new BillIssuedToItselfException(
                        $"First endorsement for bill id: {billId} has same new beneficiary id as bill's beneficiary id: {bill.BeneficiaryId}.");
                }

                if ((a + 1 < endorsementCount) &&
                    (endorsementDto.NewBeneficiaryId == endorsements[a + 1].NewBeneficiaryId))
                {
                    throw new BillIssuedToItselfException(
                        $"There are two endorsements for bill id: {billId} that has same new beneficiary id: {bill.BeneficiaryId}.");
                }

                if (endorsementDto.PreviousEndorsementId != null &&
                    endorsementDto.PreviousEndorsementId > endorsementDto.Id)
                {
                    throw new CantReferenceOldEndorsementsException(
                        $"Endorsement for bill id: {billId} references older endorsement.");
                }
            }

            if (endorsements.Count(a => a.PreviousEndorsementId == null) > 1)
            {
                throw new MoreThanOnePreviousEndorsementIsNotSetException(
                    $"Endorsements for bill id: {billId} has more than one cases where previous endorsement is not set.");
            }
        }
    }
}