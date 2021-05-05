using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BillsOfExchange.DataProvider;
using BillsOfExchange.DataProvider.Models;
using BillsOfExchange.ServiceLayer;
using BillsOfExchange.ServiceLayer.Exceptions;
using BillsOfExchange.ServiceLayer.Models;
using BillsOfExchange.ServiceLayer.Repositories;
using BillsOfExchange.ServiceLayer.Services;
using Moq;
using Xunit;
using Shouldly;

namespace BillsOfExchange.Tests
{
    public class BillsOfExchangeServiceTests
    {
        private BillOfExchangeService billOfExchangeService;
        private readonly Mock<IBillOfExchangeRepositoryWithCount> billOfExchangeRepositoryWithCount;
        private readonly Mock<IPartyRepositoryWithCount> partyRepositoryWithCount;
        private readonly Mock<IEndorsementRepository> endorsementRepository;
        private readonly Mapper mapper;
        private const int BillBeneficiaryId = 1;
        private readonly Party ctsTradeItParty = new Party { Id = BillBeneficiaryId, Name = "CTS" };


        public BillsOfExchangeServiceTests()
        {
            var myProfile = new BillOfExchangeProfile();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(myProfile));
            mapper = new Mapper(configuration);
            billOfExchangeRepositoryWithCount = new Mock<IBillOfExchangeRepositoryWithCount>();
            partyRepositoryWithCount = new Mock<IPartyRepositoryWithCount>();
            endorsementRepository = new Mock<IEndorsementRepository>();
        }

        [Fact]
        public void IfEndorsementsForBillExistsOwnerShouldTheLastEndorsementBeneficiary()
        {
            billOfExchangeRepositoryWithCount.Setup(x => x.GetByBeneficiaryIds(It.IsAny<List<int>>()))
                .Returns(new List<IEnumerable<BillOfExchange>>());
            var endorsements = new List<Endorsement>
            {
                new Endorsement { Id = 1, BillId = 2 },
                new Endorsement { Id = 2, BillId = 2, NewBeneficiaryId = 1 },
                new Endorsement { Id = 3, BillId = 1, NewBeneficiaryId = 2 },
                new Endorsement { Id = 4, NewBeneficiaryId = BillBeneficiaryId, BillId = 1 }
            };

            endorsementRepository.Setup(x => x.GetByNewBeneficiaryIds(It.IsAny<IReadOnlyList<int>>()))
                .Returns(new List<IEnumerable<Endorsement>>() { endorsements });
            endorsementRepository.Setup(x => x.GetByBillIds(It.IsAny<IReadOnlyList<int>>()))
                .Returns(new List<IEnumerable<Endorsement>>() { endorsements });
            billOfExchangeRepositoryWithCount
                .Setup(x => x.GetByIds(new List<int>() { BillBeneficiaryId })).Returns(
                    new List<BillOfExchange>
                        { new BillOfExchange { BeneficiaryId = BillBeneficiaryId, DrawerId = 2 } });

            var billOfExchangeSvc =
                new BillOfExchangeService(billOfExchangeRepositoryWithCount.Object, mapper,
                    partyRepositoryWithCount.Object, endorsementRepository.Object);
            List<BillOfExchangeDto> billOfExchanges = billOfExchangeSvc.GetBillsByOwner(BillBeneficiaryId).ToList();

            billOfExchanges.ShouldNotBeEmpty();
            billOfExchanges.FirstOrDefault().BeneficiaryId = BillBeneficiaryId;
        }

        [Fact]
        public void IfNoEndorsementForBillExistsOnlyOwnerShouldBeBillBeneficiary()
        {
            var billOfExchange = new BillOfExchange { BeneficiaryId = BillBeneficiaryId, DrawerId = 2 };
            billOfExchangeRepositoryWithCount.Setup(x => x.GetByBeneficiaryIds(It.IsAny<List<int>>()))
                .Returns(new List<IEnumerable<BillOfExchange>>
                {
                    new List<BillOfExchange>
                    {
                        billOfExchange
                    }
                });
            endorsementRepository.Setup(x => x.GetByBillIds(It.IsAny<List<int>>()))
                .Returns(new List<IEnumerable<Endorsement>>());
            endorsementRepository.Setup(x => x.GetByNewBeneficiaryIds(It.IsAny<List<int>>()))
                .Returns(new List<IEnumerable<Endorsement>>());

            var billOfExchangeSvc =
                new BillOfExchangeService(billOfExchangeRepositoryWithCount.Object, mapper,
                    partyRepositoryWithCount.Object, endorsementRepository.Object);
            IEnumerable<BillOfExchangeDto>
                billOfExchanges = billOfExchangeSvc.GetBillsByOwner(It.IsAny<int>()).ToList();
            billOfExchanges.ShouldNotBeEmpty();
            billOfExchanges.FirstOrDefault().BeneficiaryId = BillBeneficiaryId;
        }

        [Fact]
        public void ShouldThrowNotFoundExceptionIfBillIsNotFound()
        {
            billOfExchangeRepositoryWithCount.Setup(x => x.GetByIds(It.IsAny<int[]>()))
                .Returns(new List<BillOfExchange>());
            billOfExchangeService =
                new BillOfExchangeService(billOfExchangeRepositoryWithCount.Object, mapper,
                    new Mock<IPartyRepositoryWithCount>().Object, new Mock<IEndorsementRepository>().Object);
            Assert.Throws<NotFoundException>(() =>
                billOfExchangeService.GetBillOfExchangeWithCurrentOwner(It.IsAny<int>()));
        }

        [Fact]
        public void ShouldThrowInvalidDataExceptionIfBillHasSameDrawerIsAndBeneficiaryId()
        {
            billOfExchangeRepositoryWithCount.Setup(x => x.GetByIds(It.IsAny<int[]>()))
                .Returns(new List<BillOfExchange> { new BillOfExchange { BeneficiaryId = 1, DrawerId = 1 } });
            billOfExchangeService =
                new BillOfExchangeService(billOfExchangeRepositoryWithCount.Object, mapper,
                    new Mock<IPartyRepositoryWithCount>().Object, new Mock<IEndorsementRepository>().Object);
            Assert.Throws<BillIssuedToItselfException>(() =>
                billOfExchangeService.GetBillOfExchangeWithCurrentOwner(It.IsAny<int>()));
        }

        [Fact]
        public void IfNoEndorsementForBillExistsOwnerShouldBeBillBeneficiary()
        {
            billOfExchangeRepositoryWithCount.Setup(x => x.GetByIds(It.IsAny<int[]>()))
                .Returns(new List<BillOfExchange>
                    { new BillOfExchange { BeneficiaryId = BillBeneficiaryId, DrawerId = 2 } });
            partyRepositoryWithCount.Setup(x => x.GetByIds(It.IsAny<List<int>>()))
                .Returns(new List<Party> { ctsTradeItParty });
            endorsementRepository.Setup(x => x.GetByBillIds(It.IsAny<List<int>>()))
                .Returns(new List<IEnumerable<Endorsement>>());

            var billOfExchangeSvc =
                new BillOfExchangeService(billOfExchangeRepositoryWithCount.Object, mapper,
                    partyRepositoryWithCount.Object, endorsementRepository.Object);

            billOfExchangeSvc.GetBillOfExchangeWithCurrentOwner(It.IsAny<int>()).OwnerId
                .ShouldBe(BillBeneficiaryId);
            billOfExchangeSvc.GetBillOfExchangeWithCurrentOwner(It.IsAny<int>()).OwnerName
                .ShouldBe(ctsTradeItParty.Name);
        }

        [Fact]
        public void IfEndorsementForBillExistsOwnerShouldBeNewBeneficiaryForLastEndorsement()
        {
            billOfExchangeRepositoryWithCount.Setup(x => x.GetByIds(It.IsAny<int[]>()))
                .Returns(new List<BillOfExchange>
                    { new BillOfExchange { BeneficiaryId = BillBeneficiaryId, DrawerId = 2 } });
            partyRepositoryWithCount.Setup(x => x.GetByIds(It.IsAny<List<int>>()))
                .Returns(new List<Party> { ctsTradeItParty });
            var endorsements = new List<Endorsement>
            {
                new Endorsement { Id = 1 },
                new Endorsement { Id = 2 },
                new Endorsement { Id = 3 },
                new Endorsement { Id = 4, NewBeneficiaryId = 1 }
            };
            endorsementRepository.Setup(x => x.GetByBillIds(It.IsAny<List<int>>()))
                .Returns(new List<IEnumerable<Endorsement>>
                {
                    endorsements
                });

            var billOfExchangeSvc =
                new BillOfExchangeService(billOfExchangeRepositoryWithCount.Object, mapper,
                    partyRepositoryWithCount.Object, endorsementRepository.Object);

            billOfExchangeSvc.GetBillOfExchangeWithCurrentOwner(It.IsAny<int>()).OwnerId
                .ShouldBe(endorsements.LastOrDefault().NewBeneficiaryId);
            billOfExchangeSvc.GetBillOfExchangeWithCurrentOwner(It.IsAny<int>()).OwnerName
                .ShouldBe(ctsTradeItParty.Name);
        }
    }
}