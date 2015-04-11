using System.Web.Optimization;

namespace social_geo_fringe
{
  public class BundleConfig
  {
    public static void RegisterBundles(BundleCollection bundles)
    {

      bundles.Add(new StyleBundle("~/bundles/styles").Include(
                "~/Content/MapBox/mapbox-2.1.7.css",
                "~/Content/bootstrap.css",
                "~/Content/site.css",
                "~/Content/themes/base/*.css"));

      BundleTable.EnableOptimizations = true;
    }
  }
}
