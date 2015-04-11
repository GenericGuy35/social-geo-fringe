using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace social_geo_fringe
{
  /// <summary>SignalR Hub for web app to clients</summary>
  [HubName("notifications")]
  public class NotificationHub : Hub
  {
    // No methods for a client to call.
  }
}