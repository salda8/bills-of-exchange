using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using BillsOfExchange.ServiceLayer.Models;
using BillsOfExchange.ServiceLayer.Services;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace BillsOfExchange.Controllers
{
    public class BillsOfExchangeController : DefaultControllerBase
    {
        private readonly IBillOfExchangeService billOfExchangeService;

        public BillsOfExchangeController(IBillOfExchangeService billOfExchangeService)
        {
            this.billOfExchangeService = billOfExchangeService;
        }

        /// <summary>
        ///    Get bill of exchange with current owner
        /// </summary>
        /// <param name="billId">Id of the bill of exchange</param>
        [HttpGet("{billId}")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(BillOfExchangeWithCurrentOwnerDto))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(Error))]
        public IActionResult GetBillOfExchangeWithCurrentOwner([FromRoute, Required] int billId)
        {
            return Ok(billOfExchangeService.GetBillOfExchangeWithCurrentOwner(billId));
        }

        /// <summary>
        ///    Get bills of exchange with paging
        /// </summary>
        /// <param name="queryParameters">Parameters for paging</param>
        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK, typeof(PagedBillOfExchangeResult))]
        public IActionResult GetBillsOfExchange([FromQuery] QueryParameters queryParameters)
        {
            return Ok(billOfExchangeService.GetBillsOfExchange(queryParameters));
        }

        /// <summary>
        ///    Get all bills issued by a party
        /// </summary>
        /// <param name="drawerId">Id of the issuer</param>
        [HttpGet("issued-by")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IEnumerable<BillOfExchangeDto>))]
        public IActionResult GetByDrawerId([FromQuery, Required] int drawerId)
        {
            return Ok(billOfExchangeService.GetByDrawerId(drawerId));
        }

        /// <summary>
        ///    Get all bills issued by a party
        /// </summary>
        /// <param name="ownerId">Id of the owner</param>
        [HttpGet("owned-by")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IEnumerable<BillOfExchangeDto>))]
        public IActionResult GetByOwnerId([FromQuery, Required] int ownerId)
        {
            return Ok(billOfExchangeService.GetBillsByOwner(ownerId));
        }
    }
}