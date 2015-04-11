define(["Base/Component", "Base/Collection"], function () {

  var InstanceCollection = Base.Collection.extend({});

  Dispatcher = Base.Component.extend({
    defaults: {
      instances: InstanceCollection("instances")
    },
    initialize: function () {
      var instance = this;
      //jQuery event
      $(this.context).on("ComponentAdded", "*[" + componentTag + "]", function (registeredInstance) {
        instance.get("instances").add(registeredInstance);
      });
    },
    Fire: function (eventName, originInstance) {
      _.each(this.get("instances"), function (targetInstance, i) {
        if (targetInstance._events[eventName] != undefined) {
          //targetInstance.trigger("")
        }
      });
    },
    Subscribe: function (eventName, subscriberInstance) {
      var i = this.get("instances").indexOf(subscriberInstance);
      this.get("instances")[i].
    }
  });
  return Dispatcher
});