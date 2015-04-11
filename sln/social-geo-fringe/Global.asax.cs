using Ninject;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace social_geo_fringe
{
  public class MvcApplication : System.Web.HttpApplication
  {
    protected void Application_Start()
    {
      AreaRegistration.RegisterAllAreas();

      GlobalConfiguration.Configure(httpConfig => WebApiConfig.Register(httpConfig, new StandardKernel()));
      FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
      RouteConfig.RegisterRoutes(RouteTable.Routes);
      BundleConfig.RegisterBundles(BundleTable.Bundles);
      GlobalConfiguration.Configuration.Formatters.XmlFormatter.SupportedMediaTypes.Clear();
    }
  }
}
