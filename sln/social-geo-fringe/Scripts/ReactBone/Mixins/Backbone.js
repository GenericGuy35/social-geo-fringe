
// A mixin for React Components using a backboneJS model.
var BackboneMixin = {
  componentDidMount: function () {
    // Whenever there may be a change in the Backbone data, trigger a reconcile.
    this.getBackboneModels().forEach(function (model) {
      model.on('add change remove set', function () {
        resolveState(this, model);        
      }, this);
    }, this);
  },
  getBackboneModels: function () {
    return [this.getModel()];
  },
  componentWillMount: function () {
    // Whenever there will be a mount resolve the initial state with the backbone model by key name
    this.getBackboneModels().forEach(function (model) {
      resolveState(this, model);
    }, this);
  },
  setModelState: function (partialState, callback) {
    // Whenever there is a change in the component state update the backbone model(s) where necessary.
    this.getBackboneModels().forEach(function (model) {
      for (key in partialState) {
        if (model.attributes.hasOwnProperty(key)) {
          model.set(key, partialState[key]);
        }
      }
      this.setState(partialState);
    }, this);
  },
  componentWillUnmount: function () {
    // Ensure that we clean up any dangling references when the component is destroyed.
    this.getBackboneModels().forEach(function (model) {
      model.off(null, null, this);
    }, this);
  },
  getModel: function (propName) {
    return propName ? this.props.model.get(propName) : this.props.model;
  },
  setModel: function (propName, value) {
    return this.props.model.set(propName, value);
  }
};

var resolveState = function (view, model) {
  var newState = view.state;
  for (key in newState) {
    if (model.attributes.hasOwnProperty(key)) {
      newState[key] = model.get(key);
    }
  }
  view.setState(newState);
}