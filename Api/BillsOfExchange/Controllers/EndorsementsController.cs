using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using BillsOfExchange.ServiceLayer.Models;
using BillsOfExchange.ServiceLayer.Services;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace BillsOfExchange.Controllers
{
    public class EndorsementsController : DefaultControllerBase
    {
        private readonly IEndorsementsService billOfExchangeService;

        public EndorsementsController(IEndorsementsService billOfExchangeService)
        {
            this.billOfExchangeService = billOfExchangeService;
        }

        /// <summary>
        ///    Get endorsements for a bill
        /// </summary>
        /// <param name="billId">Id of the bill</param>
        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IEnumerable<EndorsementDto>))]
        public IActionResult GetEndorsementsForBill([FromQuery, Required] int billId)
        {
            return Ok(billOfExchangeService.GetEndorsementsForBill(billId));
        }
    }
}