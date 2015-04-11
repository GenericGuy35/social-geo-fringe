define(["ReactBone/Mixins/Backbone"], function () {
  $.namespace.def("Components.Map");
  Components.Map.BasicMap = React.createClass({
    mixins: [BackboneMixin],
    render: function () {
      return (React.createElement("div", { id: "map", className: "fullHeight" }));
    }
  });
});