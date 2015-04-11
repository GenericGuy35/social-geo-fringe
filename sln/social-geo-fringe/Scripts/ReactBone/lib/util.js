
/**
  * @description Remove an element from an array by value.
  */
Array.prototype.remove = function () {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

/**
  * @description Returns the value of a query string item 
  * @param {string} name the name of the query string parameter key
  */
window.getQueryParameter = function (name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.href);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

(function ($) {
  /**
    * @description Invoke a backbone event trigger on the "owner" of a React component by finding the first parent with a componentTag attribute and triggering the event in each instance of a backbone object on that element.
    * @param {string} eventName the string event name to trigger.
    * @arguments respects additional arguments send with the trigger.
    */
  $.fn.triggerOwner = function (eventName) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    _.each(this, function (element, i) {
      var targets = $(element).parents("*[" + componentTag + "]").first();
      _.each(targets, function (target, j) {
        for (key in target.components) {
          target.components[key].trigger(eventName, args);
        }
      });
    });
    return this;
  }

  define(["backboneSuper"], function () {
    ComponentCollection = Backbone.Collection.extend({
      where: function (obj) {
        var returnModels = this._super(obj);
        _.each(this.models, function (model, i) {
          for (key in obj) {
            if (model[key] != undefined || model.get(key) != undefined) {
              if ((typeof obj[key] == "function" &&
                  (obj[key](model[key]) || obj[key](model.get(key)))) ||
                  (obj[key] == model[key]) || (obj[key] == model.get(key))) {
                returnModels.push(model);
              }              
            }
          }
        });
        return returnModels;
      }
    });    
  });


  /**
    * @description Gets the instance of an object attached to an element. Gets an array of instances if necessary.
    * @param {string} typeName the stringified type name of the instance to get.  
    */
  $.fn.getInstance = function (typeName) {
    var stringTypeName = "";
    if (typeof typeName !== "string") {
      try {
        stringTypeName = typeName.constructor.name;
      } catch (ex) {
        console.log(ex);
        return [];
      }
    } else {
      stringTypeName = typeName;
    }
    var instances = [];
    _.each(this, function (element, index) {
      for (key in element.components) {
        if (key == stringTypeName) {
          instances.push(element.components[key]);
        }
      }
    });
    return new ComponentCollection(instances);
  };
  $.fn.getInstances = function () {
    var instances = [];
    _.each(this, function (element, index) {
      for (key in element.components) {        
        instances.push(element.components[key]);        
      }
    });
    return new ComponentCollection(instances);
  }  


  $.fn.msg = function (cmd) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    _.each(this, function (elem, i) {
      _.each(elem.components, function (component, j) {
        if (typeof component[cmd] == "function") {
          component[cmd].apply(component, args);
        }
      });
    });    
    return this;
  };

  $.fn.broadcast = function (cmd) {
    args = Array.prototype.slice.call(arguments);
    $.fn.msg.apply($(this), args);
    $.fn.msg.apply($("*[" + componentTag + "]", this), args);
    return this;
  };

  /**
    * @description $('.thing').bind('destroyed', function() { do stuff }); Fires when an element is removed from the DOM. Allow us a chance to clean up/unmound react components.
    */
  $.event.special.destroyed = {
    remove: function (o) {
      if (o.handler) {
        o.handler.apply(this, arguments)
      }
    }
  }  
}(jQuery));