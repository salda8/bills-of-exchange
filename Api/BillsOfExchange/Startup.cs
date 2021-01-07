using BillsOfExchange.DataProvider;
using BillsOfExchange.DataProvider.Facades;
using BillsOfExchange.Objects.Extensions;
using BillsOfExchange.Objects.Middlewares;
using BillsOfExchange.Objects.Proxies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
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
        private readonly string _spaSourcePath;
        private readonly string _corsPolicyName;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _spaSourcePath = Configuration.GetValue<string>("SPA:SourcePath");
            _corsPolicyName = Configuration.GetValue<string>("CORS:PolicyName");
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped(a => LogProxy<IPartyFacade>.Instance(new PartyFacade()));
            services.AddScoped(a => LogProxy<IBillFacade>.Instance(new BillFacade()));
            services.AddScoped(a => LogProxy<IEndoFacade>.Instance(new EndoFacade()));


            services.AddCorsConfig(_corsPolicyName);
            services.AddControllersWithViews();
            services.AddResponseCompressionConfig(Configuration);
            services.AddMvc(options => options.SuppressAsyncSuffixInActionNames = false);
            services.AddSpaStaticFiles(configuration => configuration.RootPath = $"{_spaSourcePath}/dist");
            services.AddOpenApiDocument(configure => configure.Title = $"{this.GetType().Namespace} API");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseResponseCompression();
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            Action<RequestProfilerModel> requestResponseHandler = requestProfilerModel =>
            {
                Debug.Print(requestProfilerModel.Request);
                Debug.Print(Environment.NewLine);
                Debug.Print(requestProfilerModel.Response);
            };

            app.UseMiddleware<RRLogMiddleware>(requestResponseHandler);



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

            app.UseCors(_corsPolicyName);

            // Register the Swagger generator and the Swagger UI middlewares
            app.UseOpenApi();
            app.UseSwaggerUi3(settings =>
            {
                settings.Path = "/docs";
                settings.DocumentPath = "/docs/api-specification.json";
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}"
                );
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = _spaSourcePath;
                if (env.IsDevelopment())
                    spa.UseReactDevelopmentServer(npmScript: "start");
            });
        }
    }
}
