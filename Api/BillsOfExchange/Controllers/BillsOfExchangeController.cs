using BillsOfExchange.DataProvider;
using BillsOfExchange.DataProvider.Facades;
using BillsOfExchange.DataProvider.Models;
using BillsOfExchange.Models.Responses;
using BillsOfExchange.Objects.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace BillsOfExchange.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillsOfExchangeController : BaseController
    {
        private readonly IBillFacade _repo;
        private readonly IEndoFacade _repoEndo;
        private readonly IPartyFacade _repoParty;

        public BillsOfExchangeController(IBillFacade repo, IEndoFacade repoEndo, IPartyFacade repoParty)
        {
            _repo = repo;
            _repoEndo = repoEndo;
            _repoParty = repoParty;
        }

        //seznam všech směnek (ideálně stránkovaný)
        [Route("get")]
        public IActionResult Get(int page = 1, int size = 5)
        {
            return Ok(_repo.GetPageList(page, size));
        }

        //úplného řadu danou směnku (tj. všechny rubopisy na dané směnce, seřazené)
        [Route("detail")]
        public IActionResult Detail(int billId)
        {
            var response = new BillDetailResponse
            {
                Bill = _repo.GetBill(billId)
            };
            if (response.Bill == null)
                return NotFound();
            response.Endorsements = _repoEndo.GetByBill(response.Bill);
            response.Beneficary = _repoParty.GetOne(response.Bill.BeneficiaryId);
            response.Drawer = _repoParty.GetOne(response.Bill.DrawerId);
            return Ok(response);
        }

        //seznam všech směnek které daná osoba vystavila
        [Route("drawer-bills")]
        public IActionResult BillListByDrawer(int drawerId)
        {
            var response = new BillsResponse
            {
                Bills = _repo.GetBillsByDrawer(drawerId)
            };

            if (!response.Bills.Any())
                return NotFound();

            return Ok(response);
        }

        //seznam všech směnek které daná osoba vlastní (tj. je v první v řadu, nebo přímo na směnce bez řadu)
        [Route("owner-bills")]
        public IActionResult BillListByOwner(int ownerId)
        {

            var response = new BillsResponse
            {
                Bills = _repo.GetBillsByOwner(ownerId, _repoEndo.GetByOwner(ownerId), _repoEndo.GetAllBillsId())
            };

            if (!response.Bills.Any())
                return NotFound();


            return Ok(response);
        }
    }
}
