[assembly: Microsoft.Owin.OwinStartup(typeof(social_geo_fringe.Startup))]

namespace social_geo_fringe
{
  using Owin;

  /// <summary>Configures OWIN framework for web site.</summary>
  public class Startup
  {
    /// <summary>Configures OWIN framework for web site.</summary>
    /// <param name="app"></param>
    public void Configuration(IAppBuilder app)
    {
      // Any connection or hub wire up and configuration should go here
      app.MapSignalR();
    }
  }
}