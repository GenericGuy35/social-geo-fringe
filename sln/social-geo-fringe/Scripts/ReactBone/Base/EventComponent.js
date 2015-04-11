define(["Base/Component"], function () {
  $.namespace.def("Base");

  if (!window.DISPATCH) {
    window.DISPATCH = _.extend({}, Backbone.Events);
  }

  Base.EventComponent = Base.Component.extend({   
    listenFor: function (eventName, callback) {
      DISPATCH.on(eventName, callback.bind(this));
    },
    fire: function (eventName) {
      var args = Array.prototype.slice.call(arguments);      
      DISPATCH.trigger.apply(DISPATCH, args);
    },
  });
});