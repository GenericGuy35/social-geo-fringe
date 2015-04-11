
/**
  * @description Define an arbitrary namespace for reference.
  */
$.namespace = {
  /**
    * @description Defines namespaces for object delcaration.
    * @param {string} namespace
    */
  def: function (namespace) {
    var d = namespace.split(".");
    var o = window;
    for (var j = 0; j < d.length; j++) {
      o[d[j]] = o[d[j]] || {};
      o = o[d[j]];
    }
  }
}

/**
  * @description Bootloader functions for delarative scripts.
  */
$.bootloader = {
  /**
    * @description Require several types at once.
    * @param {array<string>} typeNames
    * @param {function} onLoaded
    */
  requireTypes: function (typeNames, onLoaded) {
    var requireArray = [];
    _.each(typeNames, function (typeName, index) {
      requireArray.push(typeName.replace(/(\.)/g, '/'));
    });
    require(requireArray, onLoaded);
  },
  /**
    * @description Require a namespace type
    * @param {string} typeName
    * @param {function} onLoaded
    */
  requireType: function (typeName, onLoaded) {
    var requirePath = typeName.replace(/(\.)/g, '/');
    require(requirePath, onLoaded);
  }
}

/**
  * @description Declarative Component Wireup and Loading. Runs on load.
  * global componentTag
  */
$.livequery.registerPlugin("html");
$("*[" + componentTag + "]").livequery(function () {
  var context = this;
  var types = $(context).attr(componentTag).split(" ");
  if (!context.components) {
    context.components = {};
  }
  $.bootloader.requireTypes(types, function () {
    var args = arguments;
    _.each(types, function (typeName, index) {
      if (!context.components[typeName]) {
        context.components[typeName] = new args[index](context, typeName, $(context).data());        
      }
    });
  });
});
$("*[data-require-module]").livequery(function () {
  require([$(this).data().requireModule + ".js"], function() {});
});
