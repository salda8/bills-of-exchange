using Microsoft.AspNetCore.Mvc;

namespace BillsOfExchange.Controllers
{
    public sealed class RouteWithPrefixAttribute : RouteAttribute
    {
        private const string RoutePrefix = "api";

        public RouteWithPrefixAttribute(string template = null) : base(string.Join("/", RoutePrefix,
            string.IsNullOrWhiteSpace(template) ? "[controller]" : template))
        {
        }
    }
}