using System.Web.Mvc;

namespace social_geo_fringe.Controllers
{
  public class ErrorController : Controller
  {
    public ActionResult Http404()
    {
      Response.StatusCode = 404;

      return View();
    }
  }
}