# Tinsel

Tinsel is a slim API written in ES6 that creates styled React components. Partially inspired by React Native Stylesheets.

Pass styles in a string or an object (_or a function that returns a string or object, given a context and optionally a theme_), and easily wrap your components with the output.

## Quick peek
```js
import React, { Component } from 'react';
import { connectStyle } from 'tinsel';

class MyComponent extends Component {
  render () {
    const { styledProps: styled } = this.props;
    return (
      <section {...styled.container}>
        <h1 {...styled.title}>Welcome!</h1>
      </section>
    )
  }
}

const wrapped = connectStyle(context => `
  container {
    font-size: 4rem;
    // No need for @media tags when you can build output based on your own conditions.
    ${context.widerThan(768) ? 'max-width: 100%;' : ''}
  }

  title {
    color: ${context.is('title',':hover') ? 'red' : 'white'};
  }
`);

export default wrapped(MyComponent);
```

An event-listener loop informs the `context`, which you can use to create powerful hover effects and responsive styles, without using traditional CSS means. All function-generated styles are re-calculated and passed down as props to your component, so you can achieve even more powerful effects with simpler syntax than SASS or LESS.

Some quick points:
- `context.is(selector, condition)` uses the native & super-fast '.matches' DOM element API under the hood.
- `connectStyle()` returns a component-wrapper function that passes down the following objects, keyed by your own-determined selectors, that you can easily spread to your component children.
  - `styles`: where each value is a set of inline-styles ready to be applied.
  - `styledRefs`: where each value is a function that adopts an element's ref and uses it to determine whether an element is being hovered, or is active, etc.
  - `styledRefWrappers`: where each value is a function that adopts the element's ref _and_ passes the ref to a function given as an argument. For instance:
```js
<h2 ref={styledRefWrappers.subtitle(myOtherRefHandler)}>Subtitle</h2>
```
  - `styledProps`: where each value is that selector's `style` and `styledRef` properties, in an easy-to-spread object.

> For instance, you can manually apply the `styles.title` as `style={styles.title}` to your title element, or use `<h1 {...styledProps.title}>` to automatically apply both `style` and `ref` props.

## Why include `ref` props?
### AKA why do you need DOM Node references to generate CSS?

Tinsel generates only inline-styles. However, in today's world, pseudo-classes and responsive styling are _a must_. When you declare your styles, you can get special selector effects and responsive styles by using the `context` argument API to generate output with the same specificity you'd get from any traditional stylesheet. In order to ascertain `:hover` and `:active` and `:visited` pseudo-classes, we need a DOM node to watch over to know when to trigger style changes. The `ref` prop provides tinsel the DOM node to check against.

---

(More readme coming soon! Feel free to <a href="mailto:ab@austinbillings.com">bother me to do so.</a>)
—AB
