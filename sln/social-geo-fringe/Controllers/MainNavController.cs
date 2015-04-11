using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace social_geo_fringe.Controllers
{
  public class MainNavController : Controller
  {    
    [ChildActionOnly]
    public ActionResult Index(dynamic viewBag)
    {
      ViewBag.Title = viewBag.Title;
      ViewBag.NavSection = viewBag.NavSection;
      return PartialView("_MainNav", getMenuList());
    }

    private List<List<MenuItem>> getMenuList()
    {
      List<List<MenuItem>> menuList = new List<List<MenuItem>>();

      // Primary Menu
      List<MenuItem> firstMenu = new List<MenuItem>();
      firstMenu.Add(new MenuItem("Home", "Home", null, "~/"));
      menuList.Add(firstMenu);

      return menuList;
    }
  }
}