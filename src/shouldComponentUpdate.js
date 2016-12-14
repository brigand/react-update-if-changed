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
    changed = changed || isEqual(props.updateIfChangedEqual, nextProps.updateIfChangedEqual);
  }
  if (nextProps.updateIfChanged !== undefined) {
    changed = changed || props.updateIfChanged === nextProps.updateIfChanged; 
  }

  return !changed;
};

