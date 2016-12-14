const React = require('react');
const {shallow} = require('enzyme');
const UIC = require('../UpdateIfChanged');

it('doesn\'t error', () => {
  const wrapper = shallow(<UIC updateIfChanged>{() => null}</UIC>);
});

it('skips update if unchanged', () => {
  const props = {
    updateIfChanged: 1,
    children: () => <a />,
  };
  const wrapper = shallow(React.createElement(UIC, props));
  expect(wrapper.find('a')).toHaveLength(1);

  props.children = () => <b />;
  wrapper.setProps(props);
  expect(wrapper.find('a')).toHaveLength(1);
  expect(wrapper.find('b')).toHaveLength(0);
});

it('updates if changed', () => {
  const props = {
    updateIfChanged: 1,
    children: () => <a />,
  };
  const wrapper = shallow(React.createElement(UIC, props));
  expect(wrapper.find('a')).toHaveLength(1);

  props.updateIfChanged = 2;
  props.children = () => <b />;
  wrapper.setProps(props);
  expect(wrapper.find('a')).toHaveLength(0);
  expect(wrapper.find('b')).toHaveLength(1);
});


