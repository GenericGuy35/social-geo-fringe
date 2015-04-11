using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace social_geo_fringe
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config, IKernel kernel)
    {
      config.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{action}/{input}",
          defaults: new { input = RouteParameter.Optional }
      );
      //config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
    }
  }
}