using System.Web.Mvc;

namespace social_geo_fringe.Controllers
{
  public class HomeController : Controller
  {
    public ActionResult Index()
    {
      ViewBag.Title = "Home";
      return View();
    }
  }
}