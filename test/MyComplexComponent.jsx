import React, { Component } from 'react';
import { render } from 'react-dom';
import { connectStyle } from './theme';

class MyComponent extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { styledProps: styled } = this.props;

    return (
      <div {...styled.container}>
        <h1 {...styled.title}>
          My futuristic af component
        </h1>
        <h2 {...styled.altTitle}>
          Subtitle!
        </h2>
        <p {...styled.copy}>
          Lorem ipsum dolor sit amet.
        </p>
      </div>
    );
  }
};

const wrapped = connectStyle((context, theme) => `
  container {
    ${theme.containerStyle()}
    min-height: 500px;
    display: inline-block;
    color: ${theme.colors.white};
    transition: background 0.25s;
    background-color: ${context.widerThan(1100) ? theme.colors.black : theme.colors.red};
    ${context.widerThan(1100)
      ? `min-width: 550px;`
      : `width: calc(100vw - 55px);`
    }
  }

  title, altTitle {
    font-size: 30px;
    color: ${context.widerThan(768) ? (context.is('title',':hover') ? 'orange' : 'purple') : 'blue'};
    transition: color 250ms;
  }

  // here's a comment
  altTitle {
    color: ${theme.colors[context.widerThan(1100) ? 'red' : 'white']};
  }

  /* and a multiline comment as well

            lol
  */

  copy {
    transition: transform 0.5s;
    border: 1px solid orange;
    ${context.is('copy', ':hover')
      ? 'transform: scale(0.9);'
      : ''
    }
    font-family: ${theme.serifFont};
  }
`);

export default wrapped(MyComponent);
