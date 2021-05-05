using System.ComponentModel.DataAnnotations;
using System.Net;
using BillsOfExchange.ServiceLayer.Models;
using BillsOfExchange.ServiceLayer.Services;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace BillsOfExchange.Controllers
{
    public class PartyController : DefaultControllerBase
    {
        private readonly IPartyService partyService;

        public PartyController(IPartyService partyService)
        {
            this.partyService = partyService;
        }

        /// <summary>
        ///    Get parties with paging
        /// </summary>
        /// <param name="queryParameters">Parameters for paging</param>
        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK, typeof(PagedPartyResult))]
        public IActionResult GetParties([FromQuery] QueryParameters queryParameters)
        {
            return Ok(partyService.GetParties(queryParameters));
        }

        /// <summary>
        ///    Get party by party id
        /// </summary>
        /// <param name="partyId">Id of the party</param>
        [HttpGet("{partyId}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(PartyDto))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(Error))]
        public IActionResult GetById([FromRoute, Required] int partyId)
        {
            return Ok(partyService.GetById(partyId));
        }
    }
}