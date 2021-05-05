using Microsoft.AspNetCore.Builder;

namespace BillsOfExchange
{
    public static class Extensions
    {
        public static IApplicationBuilder UseExceptionHandlingMiddleware(this IApplicationBuilder builder) =>
            builder.UseMiddleware<ExceptionHandlingMiddleware>();

        public static void UseSwagger(this IApplicationBuilder app)
        {
            app.UseOpenApi();
            app.UseSwaggerUi3(settings =>
            {
                settings.DocumentTitle = "Bills of Exchange";
                settings.Path = "/api-docs";
                settings.DocExpansion = "list";
                settings.EnableTryItOut = true;
            });
            app.UseReDoc();
        }
    }
}