
define(["Base/Collection"], function () {
  $.namespace.def("Util");
  Util.ErrorCollection = Base.Collection.extend({
    model: Backbone.Model.extend({
      defaults: {
        property: "",
        text: ""
      }
    })
  });
  return Util.ErrorCollection;
});