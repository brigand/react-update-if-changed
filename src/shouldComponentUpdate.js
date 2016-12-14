const isEqual = require('lodash/isEqual');

module.exports = function(nextProps, nextState) {
  const {props, state} = this;

  // State changes override updateIfChanged
  if (state && nextState) {
    const keys = Object.keys(nextState);
    if (keys.some((key) => state[key] !== nextState[key])) {
      return true;
    }
  }

  let changed = false;
  if (nextProps.updateIfChangedEqual !== undefined) {
    if (isEqual(props.updateIfChangedEqual, nextProps.updateIfChangedEqual)) {
      return false;
    }
  }
  else if (nextProps.updateIfChanged !== undefined) {
    if (props.updateIfChanged === nextProps.updateIfChanged) {
      return false;
    }
  }
  return true;
};

