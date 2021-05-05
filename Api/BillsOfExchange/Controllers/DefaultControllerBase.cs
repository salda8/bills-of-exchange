using System.Net;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace BillsOfExchange.Controllers
{
    [SwaggerResponse(HttpStatusCode.InternalServerError, typeof(Error))]
    [ProducesErrorResponseType(typeof(Error))]
    [RouteWithPrefix]
    public abstract class DefaultControllerBase : ControllerBase
    {
    }
}