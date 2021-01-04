using BillsOfExchange.DataProvider;
using BillsOfExchange.DataProvider.Facades;
using BillsOfExchange.DataProvider.Models;
using BillsOfExchange.Models.Responses;
using BillsOfExchange.Objects.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace BillsOfExchange.Controllers
{/*
  * Nekdo mi po telefonu rekl ze je to cele na 3 hodiny samozrejme jsem si to 
  * nechal na dnesek rano ale za 3 hodiny se to cele neda zvladnout, udelal jsem zatim prvni polovinu ale bohuzel nemuzu pokracovat...
  * mohl bych udelat klientskou cast ve stredu a tohle jeste trochu poladit nicmene je to funkcni vcetne tech bonusovych bodu... O.M.
  */
    [ApiController]
    [Route("[controller]")]
    public class BillsOfExchangeController : BaseController
    {
        private readonly IBillFacade _repo;
        private readonly IEndoFacade _repoEndo;

        public BillsOfExchangeController(IBillFacade repo, IEndoFacade repoEndo)
        {
            _repo = repo;
            _repoEndo = repoEndo;
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
