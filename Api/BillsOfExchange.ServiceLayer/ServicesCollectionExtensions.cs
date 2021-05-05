using AutoMapper;
using AutoMapper.Configuration;
using BillsOfExchange.DataProvider;
using BillsOfExchange.ServiceLayer.Repositories;
using BillsOfExchange.ServiceLayer.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BillsOfExchange.ServiceLayer
{
    public static class ServicesCollectionExtensions
    {
        public static void AddServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IPartyService, PartyService>();
            serviceCollection.AddScoped<IBillOfExchangeService, BillOfExchangeService>();
            serviceCollection.AddScoped<IEndorsementsService, EndorsementsService>();
        }

        public static void AddRepositories(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton(_ =>
                DispatchProxyLoggingDecorator<IBillOfExchangeRepositoryWithCount>.Decorate(
                    new BillOfExchangeRepositoryWithCount()));
            serviceCollection.AddSingleton(_ =>
                DispatchProxyLoggingDecorator<IEndorsementRepository>.Decorate(
                    new EndorsementRepository()));
            serviceCollection.AddSingleton(_ =>
                DispatchProxyLoggingDecorator<IPartyRepositoryWithCount>.Decorate(
                    new PartyRepositoryWithCount()));
            serviceCollection.AddSingleton(_ =>
                DispatchProxyLoggingDecorator<IBillOfExchangeRepository>.Decorate(
                    new BillOfExchangeRepositoryWithCount()));
            serviceCollection.AddSingleton(_ =>
                DispatchProxyLoggingDecorator<IEndorsementRepository>.Decorate(
                    new EndorsementRepository()));
            serviceCollection.AddSingleton(_ =>
                DispatchProxyLoggingDecorator<IPartyRepository>.Decorate(
                    new PartyRepositoryWithCount()));
        }

        public static void AddMapper(this IServiceCollection serviceCollection)
        {
            var cfg = new MapperConfigurationExpression();
            cfg.AddProfile<BillOfExchangeProfile>();
            var mapperConfig = new MapperConfiguration(cfg);
            IMapper mapper = new Mapper(mapperConfig);
            serviceCollection.AddSingleton(mapper);
        }
    }
}