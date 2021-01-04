using BillsOfExchange.DataProvider;
using BillsOfExchange.DataProvider.Facades;
using BillsOfExchange.Objects.Middlewares;
using BillsOfExchange.Objects.Proxies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Diagnostics;
using static BillsOfExchange.Objects.Middlewares.RRLogMiddleware;

namespace BillsOfExchange
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped(a => LogProxy<IPartyFacade>.Instance(new PartyFacade()));
            services.AddScoped(a => LogProxy<IBillFacade>.Instance(new BillFacade()));
            services.AddScoped(a => LogProxy<IEndoFacade>.Instance(new EndoFacade()));
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            Action<RequestProfilerModel> requestResponseHandler = requestProfilerModel =>
            {
                Debug.Print(requestProfilerModel.Request);
                Debug.Print(Environment.NewLine);
                Debug.Print(requestProfilerModel.Response);
            };

            app.UseMiddleware<RRLogMiddleware>(requestResponseHandler);

            app.UseHttpsRedirection();

            app.UseRouting();


            app.UseExceptionHandler(a => a.Run(async context =>
            {
                var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
                var exception = exceptionHandlerPathFeature.Error;

                var message = exception.Message;
                if (exception.InnerException != null) message = exception.InnerException.Message;

                var result = JsonConvert.SerializeObject(new { error = message });
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(result);
            }));

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
