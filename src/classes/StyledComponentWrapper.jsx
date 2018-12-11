import React, { Component } from 'react';

class StyledComponentWrapper extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { subscribeToStyleSheet } = this.props;

    subscribeToStyleSheet(stylesheetProps => this.setState(stylesheetProps));
  }

  render () {
    const { wrappableComponent, subProps } = this.props;

    return React.createElement(wrappableComponent, { ...subProps, ...this.state });
  }
};

export default StyledComponentWrapper;
