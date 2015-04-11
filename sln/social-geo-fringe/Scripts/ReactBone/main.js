/* global require,scriptsRoot,componentRoot */
(function () {
  "use strict";

  require.config({
    "baseUrl": scriptsRoot,
    "paths": {
      "backbone": "backbone",
      "backboneSuper": "backbone-super",
      "jquery": "jquery-2.1.3",
      "jquery-dataTables": "DataTables-1.10.4/jquery.dataTables",
      "react": "react/react-0.12.2",      
      "JSXTransformer": "react/JSXTransformer-Require",
      "underscore": "underscore",
      "bootstrap": "bootstrap.min",
      "livequery": "jquery.livequery.min",
      "bootloader": "ReactBone/lib/bootloader",
      "css": "r.css",
      "text": "r.text",
      "jsx": "r.jsx",
      "Components": componentRoot + "Components",
      "Util": componentRoot + "Util",
      "Base": componentRoot + "Base",
      "util": "ReactBone/lib/util",
      "Map": "MapBox/mapbox-2.1.7.min"
    },
    jsx: {
      fileExtension: ".jsx",
      harmony: true,
      stripTypes: true
    },
    map: {
      "*": {
        // css! flag for taking css dependencies in behaviors with requireCss (as requireJS) e.g.:
        // define(["css!<PATH_TO_CSS>", "<PATH_TO_JS>"], function(){...});
        "css": "require/css"
      }
    },
    "shim": {
      "backbone": {
        "deps": ["underscore", "jquery"]
      },
      "underscore": {
        "exports": "_"
      },
      "react": {
        "deps": ["JSXTransformer"],
        "exports": "React"
      },
      "bootstrap": {
        "deps": ["jquery"]
      },
      "livequery": {
        "deps": ["jquery"]
      },
      "bootloader": {
        "deps": ["livequery", "util"]
      },
      "util": {
        "deps": ["jquery", "backbone"]
      }
    }
  });

  require([
    "underscore", "backbone", "react", "bootstrap", "livequery", "bootloader"
  ], function (
    _, Backbone, React
  ) {
    window.React = React;
    window.Backbone = Backbone;
    // Initialize   
  });
}());
