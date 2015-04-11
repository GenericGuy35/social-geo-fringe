using LinqToTwitter;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace social_geo_fringe.API
{
  public class TwitterController : ApiController
  {
    // GET api/<controller>
    [HttpGet]
    public object GetByHash(string hashtag)
    {
      var auth = new SingleUserAuthorizer
      {
        CredentialStore = new SingleUserInMemoryCredentialStore
        {
          ConsumerKey = ConfigurationManager.AppSettings["consumerKey"],
          ConsumerSecret = ConfigurationManager.AppSettings["consumerSecret"],
          AccessToken = ConfigurationManager.AppSettings["twitterAccessToken"],
          AccessTokenSecret = ConfigurationManager.AppSettings["twitterAccessTokenSecret"]
        }
      };
      var twitterCtx = new TwitterContext(auth);      

      List<Search> tweets = (from tweet in twitterCtx.Search
                             where tweet.Type == SearchType.Search &&
                                   tweet.Query == hashtag 
                             select tweet).ToList();
      List<Status> statuses = new List<Status>();
      foreach(Search s in tweets){
        statuses.AddRange(s.Statuses);
      }

      /*
       {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [-77.03238901390978,38.913188059745586]
          },
          "properties": {
            "title": "Mapbox DC",
            "description": "1714 14th St NW, Washington DC",
            "marker-color": "#fc4353",
            "marker-size": "large",
            "marker-symbol": "monument"
          }
        } 
       */

      List<dynamic> modStatuses = new List<dynamic>();
      foreach (Status s in statuses)
      {
        if (s.Coordinates.Longitude != 0 && s.Coordinates.Latitude != 0)
        {
          modStatuses.Add(new
          {
            Text = s.Text,
            Coords = s.Coordinates,
            Meta = s.MetaData,
            AtName = s.User.ScreenNameResponse,
            Name = s.User.Name,
            UserImage = s.User.ProfileImageUrl,
            Created = s.CreatedAt,
            geo = new
            {
              type = "Feature",
              geometry = new
              {
                type = "Point",
                coordinates = new double[] { s.Coordinates.Longitude, s.Coordinates.Latitude }
              },
              properties = new
              {
                title = s.User.ScreenNameResponse,
                description = s.Text
              }
            }
          });
        }
      }

      return new { Count = statuses.Count, Tweets = modStatuses };
    }

  }
}