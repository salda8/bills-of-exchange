using System.Collections.Generic;
using BillsOfExchange.DataProvider;
using BillsOfExchange.DataProvider.Models;
using BillsOfExchange.ServiceLayer.Exceptions;
using BillsOfExchange.ServiceLayer.Repositories;
using BillsOfExchange.ServiceLayer.Services;
using Moq;
using Xunit;

namespace BillsOfExchange.Tests
{
    public class EndorsementServiceTests
    {
        private EndorsementsService endorsementsService;
        private readonly Mock<IBillOfExchangeRepositoryWithCount> billOfExchangeRepositoryWithCount;
        private readonly Mock<IPartyRepositoryWithCount> partyRepositoryWithCount;
        private readonly Mock<IEndorsementRepository> endorsementRepository;
        private const int BillBeneficiaryId = 1;
        private readonly Party ctsTradeItParty = new Party { Id = BillBeneficiaryId, Name = "CTS" };

        public EndorsementServiceTests()
        {
            billOfExchangeRepositoryWithCount = new Mock<IBillOfExchangeRepositoryWithCount>();
            partyRepositoryWithCount = new Mock<IPartyRepositoryWithCount>();
            partyRepositoryWithCount.Setup(x => x.Get(int.MaxValue, 0)).Returns(new List<Party>() { ctsTradeItParty });
            endorsementRepository = new Mock<IEndorsementRepository>();
        }

        [Fact]
        public void ShouldThrowBillIssuedToItselfIfBeneficiaryIsIsSameAsDrawerIdException()
        {
            var endorsements = new List<Endorsement>
            {
                new Endorsement
                    { Id = 2, BillId = 1, NewBeneficiaryId = BillBeneficiaryId, PreviousEndorsementId = null },
                new Endorsement { Id = 4, BillId = 1, NewBeneficiaryId = BillBeneficiaryId, PreviousEndorsementId = 2 }
            };

            endorsementRepository.Setup(x => x.Get(int.MaxValue, 0)).Returns(endorsements);
            billOfExchangeRepositoryWithCount.Setup(x => x.GetByIds(new List<int>() { 1 })).Returns(
                new List<BillOfExchange>() { new BillOfExchange() { BeneficiaryId = 1, DrawerId = 1 } });

            endorsementsService = new EndorsementsService(endorsementRepository.Object, partyRepositoryWithCount.Object,
                billOfExchangeRepositoryWithCount.Object);
            Assert.Throws<BillIssuedToItselfException>(() => endorsementsService.GetEndorsementsForBill(1));
        }

        [Fact]
        public void ShouldThrowBillIssuedToItselfIfTwoEndorsementsInARowHasSameBeneficiaryId()
        {
            var endorsements = new List<Endorsement>
            {
                new Endorsement
                    { Id = 2, BillId = 1, NewBeneficiaryId = BillBeneficiaryId, PreviousEndorsementId = null },
                new Endorsement { Id = 4, BillId = 1, NewBeneficiaryId = BillBeneficiaryId, PreviousEndorsementId = 2 }
            };

            endorsementRepository.Setup(x => x.Get(int.MaxValue, 0)).Returns(endorsements);
            billOfExchangeRepositoryWithCount.Setup(x => x.GetByIds(new List<int>() { 1 })).Returns(
                new List<BillOfExchange>() { new BillOfExchange() { BeneficiaryId = 3, DrawerId = 1 } });

            endorsementsService = new EndorsementsService(endorsementRepository.Object, partyRepositoryWithCount.Object,
                billOfExchangeRepositoryWithCount.Object);
            Assert.Throws<BillIssuedToItselfException>(() => endorsementsService.GetEndorsementsForBill(1));
        }

        [Fact]
        public void ShouldThrowCantReferenceOldEndorsementException()
        {
            var endorsements = new List<Endorsement>
            {
                new Endorsement { Id = 2, BillId = 1, NewBeneficiaryId = BillBeneficiaryId, PreviousEndorsementId = 4 },
                new Endorsement
                    { Id = 4, BillId = 1, NewBeneficiaryId = BillBeneficiaryId + 1, PreviousEndorsementId = 2 }
            };

            endorsementRepository.Setup(x => x.Get(int.MaxValue, 0)).Returns(endorsements);
            partyRepositoryWithCount.Setup(x => x.Get(int.MaxValue, 0)).Returns(new List<Party>() { ctsTradeItParty });
            billOfExchangeRepositoryWithCount.Setup(x => x.GetByIds(new List<int>() { 1 })).Returns(
                new List<BillOfExchange>() { new BillOfExchange() { BeneficiaryId = 3, DrawerId = 1 } });

            endorsementsService = new EndorsementsService(endorsementRepository.Object, partyRepositoryWithCount.Object,
                billOfExchangeRepositoryWithCount.Object);
            Assert.Throws<CantReferenceOldEndorsementsException>(() => endorsementsService.GetEndorsementsForBill(1));
        }

        [Fact]
        public void MoreThanOnePreviousEndorsementIsNotSetException()
        {
            var endorsements = new List<Endorsement>
            {
                new Endorsement
                    { Id = 2, BillId = 1, NewBeneficiaryId = BillBeneficiaryId, PreviousEndorsementId = null },
                new Endorsement
                    { Id = 4, BillId = 1, NewBeneficiaryId = BillBeneficiaryId + 1, PreviousEndorsementId = null },
                new Endorsement
                    { Id = 5, BillId = 1, NewBeneficiaryId = BillBeneficiaryId + 2, PreviousEndorsementId = 4 }
            };

            endorsementRepository.Setup(x => x.Get(int.MaxValue, 0)).Returns(endorsements);
            partyRepositoryWithCount.Setup(x => x.Get(int.MaxValue, 0)).Returns(new List<Party>()
                { ctsTradeItParty, new Party() { Id = 2, Name = "TEST PARTY" } });
            billOfExchangeRepositoryWithCount.Setup(x => x.GetByIds(new List<int>() { 1 })).Returns(
                new List<BillOfExchange>() { new BillOfExchange() { BeneficiaryId = 3, DrawerId = 1 } });

            endorsementsService = new EndorsementsService(endorsementRepository.Object, partyRepositoryWithCount.Object,
                billOfExchangeRepositoryWithCount.Object);
            Assert.Throws<MoreThanOnePreviousEndorsementIsNotSetException>(() =>
                endorsementsService.GetEndorsementsForBill(1));
        }
    }
}