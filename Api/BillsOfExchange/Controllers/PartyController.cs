using BillsOfExchange.DataProvider.Facades;
using BillsOfExchange.Objects.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace BillsOfExchange.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PartyController: BaseController
    {
        private readonly IPartyFacade _repo;

        public PartyController(IPartyFacade repo)
        {
            _repo = repo;
        }

        //seznam všech osob(ideálně stránkovaný)
        public IActionResult Get(int page = 1, int size = 5)
        {
            return Ok(_repo.GetPageList(page, size));
        }
    }
}