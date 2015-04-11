define(["backboneSuper"], function () {
  $.namespace.def("Base");
  Base.Collection = Backbone.Collection.extend({
    name: null,
    constructor: function (name) {
      this.name = name;
      var args = Array.prototype.slice.apply(arguments);
      args.shift();
      Backbone.Collection.apply(this, args);
    },
    parse: function (data) {
      var models = (this.name && data[this.name] ? data[this.name] : data);
      if ($.isArray(models) && models.length > 0 && this.model.prototype.defaults) {
        for (key in models[0]) {
          if (this.model.prototype.defaults[key] == undefined) {
            _.each(models, function (model, i) {
              delete model[key];
            });
          }
        }
      }
      return models;
    },
    isEmpty: function(){
      return this.length <= 0;
    },
    first: function () {
      return this.at(0);
    },
    last: function () {
      return this.at(this.length - 1);
    }
  });
});