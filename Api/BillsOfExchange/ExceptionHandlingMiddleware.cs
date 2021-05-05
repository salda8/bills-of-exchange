using System;
using System.Diagnostics;
using System.Net;
using System.Threading.Tasks;
using BillsOfExchange.ServiceLayer.Exceptions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace BillsOfExchange
{
    public class ExceptionHandlingMiddleware
    {
        private readonly ILogger<ExceptionHandlingMiddleware> logger;
        private readonly RequestDelegate next;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            this.logger = logger;
            this.next = next;
        }

        public async Task Invoke(HttpContext context, IWebHostEnvironment environment)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex, environment);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception, IHostEnvironment environment)
        {
            var code = (int)HttpStatusCode.InternalServerError;

            switch (exception)
            {
                case InvalidDataException _:
                    code = 419;
                    break;
                
                case NotFoundException _:
                    code = 404;
                    break;
            }

            var error = new Error { Message = exception.Message, Code = code };

            if (code == (int)HttpStatusCode.InternalServerError)
            {
                if (environment.IsProduction())
                {
                    error.Message = "Ooops something went horribly wrong.";
                }

                logger.LogError(exception.ToStringDemystified());
            }
            else
            {
                logger.LogWarning(exception.ToStringDemystified());
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = code;

            return context.Response.WriteAsync(JsonConvert.SerializeObject(error));
        }
    }
}