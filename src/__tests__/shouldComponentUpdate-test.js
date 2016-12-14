const scu = require('../shouldComponentUpdate');
const run = (oldProps={}, newProps={}, stateChanged=false) => (
  scu.call(
    {props: oldProps, state: {a: 1}},
    newProps,
    stateChanged ? {a: 2} : {a: 1}
  )
);

it('returns true', () => {
  const res = run();
  expect(res).toBe(true);
});

it('updateIfChanged - no change', () => {
  const res = run({updateIfChanged: 1}, {updateIfChanged: 2});
  expect(res).toBe(true);
});

it('updateIfChanged - change', () => {
  const res = run({updateIfChanged: 1}, {updateIfChanged: 1});
  expect(res).toBe(false);
});

it('updateIfChanged - objects', () => {
  const res = run({updateIfChanged: {}}, {updateIfChanged: {}});
  expect(res).toBe(true);
});

it('updateIfChangedEqual', () => {
  const res = run({updateIfChangedEqual: {x: 1}}, {updateIfChangedEqual: {x: 1}});
  expect(res).toBe(false);
});

