using BillsOfExchange.DataProvider;
using BillsOfExchange.DataProvider.Facades;
using BillsOfExchange.Models.Responses;
using BillsOfExchange.Objects.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace BillsOfExchange.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PartyController: BaseController
    {
        private readonly IBillFacade _repo;
        private readonly IEndoFacade _repoEndo;
        private readonly IPartyFacade _repoParty;

        public PartyController(IBillFacade repo, IEndoFacade repoEndo, IPartyFacade repoParty)
        {
            
            _repo = repo;
            _repoEndo = repoEndo;
            _repoParty = repoParty;
        }

        //seznam všech osob(ideálně stránkovaný)
        public IActionResult Get(int page = 1, int size = 5)
        {
            return Ok(_repoParty.GetPageList(page, size));
        }

        public IActionResult Detail(int partyId)
        {
            

            var party = _repoParty.GetOne(partyId);
            if (party == null)
                return NotFound();

            var detail = new PartyDetailResponse();
            detail.Id = party.Id;
            detail.Name = party.Name;

            return Ok();
        }
    }
}