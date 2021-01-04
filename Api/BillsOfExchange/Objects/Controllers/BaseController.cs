using BillsOfExchange.DataProvider.Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillsOfExchange.Objects.Controllers
{
    public abstract class BaseController : Controller
    {
        const string PAGE_HEADER_NAME = "x-paging";

        public override OkObjectResult Ok([ActionResultObjectValue] object value)
        {
            if (value is IPagingList il) Response.Headers.Add(PAGE_HEADER_NAME, JsonConvert.SerializeObject(il.PagingInfo));
            return base.Ok(value);
        }
    }
}
