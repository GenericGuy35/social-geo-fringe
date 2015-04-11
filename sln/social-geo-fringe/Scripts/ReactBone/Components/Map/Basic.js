define(["Base/Component", "Base/Collection", "jsx!Components/Map/BasicMap", "Map"], function () {
  $.namespace.def("Components.Map");

  Tweets = Base.Collection.extend({});

  Components.Map.Basic = Base.Component.extend({
    defaults: {
      accessToken: '',
      mapName: '',
      latLon: [47.634, -122.358],
      zoom: 14,
      _interval: null,
      _inactivity: null,
      _updating: false,
      tweets: new Tweets("tweets"),
      map: null,
      continuousUpdate: true,
      updateInterval: 10000,
      inactivityDelay: 30000,
      apiEndpoint: "/Api/Twitter/GetByHash",
      hashtag: "thisthingimdoingrightnow"
    },
    initialize: function () {
      var instance = this;
      instance.Render();
      if (instance.get("continuousUpdate")) {
        instance.ResetInactivity();
        $(instance.context).mousemove(function () {
          instance.ResetInactivity(instance);
        });
      } else {
        instance.UpdateTweets(instance);
      }
    },
    UpdateTweets: function (instance) {      
      var addTweets = function (tweets) {
        instance.set("tweets", new Tweets("tweets"));
        instance.get("tweets").add(tweets.Tweets);                
        var geo = [];
        _.each(tweets.Tweets, function (tweet, i) {
          geo.push(tweet.geo);
          geo[i].properties["marker-color"] = "#fc4353";
          geo[i].properties["marker-size"] = "large";
          geo[i].properties["marker-symbol"] = "rocket";
        });        
        instance.get("map").featureLayer.setGeoJSON(geo);        
      }
      $.getJSON(instance.get("apiEndpoint"), { hashtag: instance.get("hashtag") }, addTweets);
    },
    ResetInactivity: function (inst) {
      var instance = (inst || this);
      clearTimeout(instance.get("_inactivity"));
      if (!instance.get("_updating")) {
        instance.StartUpdate(instance);
      }
      instance.set("_inactivity", setTimeout(function () { instance.StopUpdate(instance) }, instance.get("inactivityDelay")));
    },
    StartUpdate: function (inst) {
      var instance = (inst || this);
      instance.set("_updating", true);
      instance.UpdateTweets(instance);
      instance.set("_interval", setInterval(function () { instance.UpdateTweets(instance) }, instance.get("updateInterval")));
    },
    StopUpdate: function (inst) {
      var instance = (inst || this);
      clearInterval(instance.get("_interval"));
      instance.set("_updating", false);
    },
    Render: function () {      
      React.render(React.createElement(Components.Map.BasicMap, { model: this }), this.context);

      L.mapbox.accessToken = this.get("accessToken");
      this.set("map", L.mapbox.map('map', this.get("mapName")).setView(this.get("latLon"), this.get("zoom")));

      return this;
    }
  });
  return Components.Map.Basic;
});