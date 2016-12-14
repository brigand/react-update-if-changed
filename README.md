
This lib can drastically improve performance of your React apps. It works on a simple premise:
you use some kind of id to identify data for a component tree. This can be as simple as a string
id, or as complex as a deeply nested structure. The goal is to avoid vdom diffing and vdom generation
which are primary bottlenecks in React applications, especially in lists.

It comes in two forms: a shouldComponentUpdate function, and a component 

## Install

```
npm install --save react-update-if-changed
```

## shouldComponentUpdate

The simplest way to use it is with the `shouldComponentUpdate` version. You can stick
this on any component and it'll allow the parent to opt into the optimizations. If the
parent doesn't pass a `updateIfChanged` or `updateIfChangedEqual` prop, then the component
will always update.

```js
import {shouldComponentUpdate} from 'react-update-if-changed';

class C extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate; 
  }
  render() {
    // ...
  }
}
```

Then when using this component, pass the information to be used as the unique key. The
`updateIfChangedEqual` variant does a deep comparison.

```jsx
<C updateIfChanged={data.id} data={data} />
<C updateIfChangedEqual={[data.id, data.firstName]} data={data} />
```

## UpdateIfChanged (component)

Sometimes you don't want to break out parts of the vdom to separate components. For this case,
a component is exposed that lazily renders your vdom using a "function as a child" pattern.

```jsx
import {UpdateIfChanged} from 'react-update-if-changed';

const C = (props) => (
  <div>
    <UpdateIfChanged updateIfChanged={props.id}>
    {() => (
      <div>{expensive stuff}</div>
    )}
    </UpdateIfChanged>
  </div>
);
```

If the key hasn't changed, it won't even call the child function again, resulting in React
doing an `===` check and deciding nothing needs to be updated.

---

That's all, may your apps be ever more responsive!

