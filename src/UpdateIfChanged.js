const React = require('react');
const isEqual = require('lodash/isEqual');

module.exports = class UpdateIfChanged extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    const {props} = this;
    let changed = false;

    if (nextProps.updateIfChangedEqual !== undefined) {
      changed = changed || !isEqual(props.updateIfChangedEqual, nextProps.updateIfChangedEqual);
    }
    if (nextProps.updateIfChanged !== undefined) {
      changed = changed || props.updateIfChanged !== nextProps.updateIfChanged; 
    }

    if (changed) {
      this.cachedNode = this.getContent(nextProps);
    }
  }
  getContent(props) {
    return props.children();
  }
  render() {
    if (!this.cachedNode) {
      this.cachedNode = this.getContent(this.props);
    }
    return this.cachedNode;
  }
};

