define(["backboneSuper"], function () {
  $.namespace.def("Base");
  Base.Component = Backbone.Model.extend({    
    context: null,    
    defaults: null,
    name: null,
    subscribers: [],
    constructor: function (context, name) {      
      this.context = context;
      this.name = name;
      var args = Array.prototype.slice.apply(arguments);
      args.shift();
      args.shift();
      var instance = this;
      $(this.context).bind("destroyed", function () {
        instance.cleanup()
      });
      this.on('change remove set', function () {
        _.each(this.subscribers, function (sub, i) {
          var subModel = sub.attributes;
          for (key in instance.attributes) {            
            sub.set(key, instance.attributes[key]);            
          }          
        });
      }, this);
      Backbone.Model.apply(this, args);
    },
    parse: function (data, opts) {
      var attrs = this.attributes;
      var keysToRemove = [];
      for (key in attrs) {
        if (attrs[key] instanceof Backbone.Collection) {
          keysToRemove.push(key);
          this.get(key).set(data, { parse: true });          
        }
      }
      _.each(keysToRemove, function (key, i) {
        delete data[key];
      });
      return data;
    },
    sync: function (method, model, opts) {
      var originalError = null;
      if (opts.error && typeof opts.error == "function") {
        originalError = opts.error;
      }
      var instance = this;
      opts.error = function (xhr, statusText, message) {
        console.log(instance.name + " encountered an error with a SYNC (Fetch,Save,Destroy) " + method + " request to " + opts.url + ": " + xhr.status + " " + message);
        console.log(instance.context);
        if (originalError) {
          originalError(instance, status, xhr);
        }
      }
      this._super(method, model, opts);
    },
    subscribeTo: function (instance) {
      if (instance && instance != this) {
        instance._setSubsriber(this);
      }
    },
    _setSubsriber: function (instance) {
      if (instance) {
        this.subscribers.push(instance);
      }
    },
    cleanup: function () {      
      console.log(this.name + " was destroyed");
      React.unmountComponentAtNode(this.context);
    }
  });
});