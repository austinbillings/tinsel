import React from 'react';
import * as contextMethods from '../context';
import { INTERACTION_EVENTS } from '../constants';
import { validateStylesheet } from '../validation';
import { homogenizeStylesheet } from '../processing';
import { parseStylesheetDocument } from '../parsers';
import StyledComponentWrapper from './StyledComponentWrapper';
import { isFunction, isObject, debounce, getFakeContextMethods, attachListeners } from '../utils';

class StyleSheet {
  constructor (definition, theme = {}) {
    const fakeContext = getFakeContextMethods();
    const renderedStylesheet = validateStylesheet(definition, fakeContext, theme);
    const selectors = Object.keys(renderedStylesheet);

    this.state = {
      refs: {},
      selectors,
      definition,
      subscriptions: []
    };

    this.theme = theme;
    this.getStyles = this.getStyles.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.getRefSetter = this.getRefSetter.bind(this);
    this.getRefWrapper = this.getRefWrapper.bind(this);
    this.getStyleProps = this.getStyleProps.bind(this);
    this.performUpdate = this.performUpdate.bind(this);
    this.setSelectorRef = this.setSelectorRef.bind(this);
    this.getElementMatcher = this.getElementMatcher.bind(this);
    this.getContextMethods = this.getContextMethods.bind(this);
    this.getComponentWrapper = this.getComponentWrapper.bind(this);

    window.addEventListener('resize', debounce(() => { this.performUpdate(); }, 10));
  }

  unsubscribe (subscriptionIndex) {
    delete this.state.subscriptions[subscriptionsIndex];
  }

  subscribe (callback) {
    var subscriptionIndex = this.state.subscriptions.push(callback);

    callback(this.getStyleProps());

    return () => this.unsubscribe(subscriptionIndex);
  }

  performUpdate () {
    const { definition, subscriptions } = this.state;

    if (!isFunction(definition))
      return;

    const styleProps = this.getStyleProps();
    const invokeWithStyleProps = subscription => subscription(styleProps);

    return subscriptions
      .filter(isFunction)
      .forEach(invokeWithStyleProps);
  }

  getElementMatcher (selector, matchCondition) {
    if (!this.state.refs[selector]) {
      return console.error('cant check for matcher, no ref for selector', selector);
    } else {
      return this.state.refs[selector].matches(matchCondition);
    }
  }

  getContextMethods () {
    const is = this.getElementMatcher;
    const { widerThan, narrowerThan, tallerThan, shorterThan } = contextMethods;

    return { is, widerThan, narrowerThan, tallerThan, shorterThan };
  }

  setSelectorRef (selector, ref) {
    this.state.refs[selector] = ref;

    attachListeners(ref, INTERACTION_EVENTS, this.performUpdate);

    return ref;
  }

  getRefSetter (selector, callback) {
    return (ref) => {
      if (isFunction(callback)) callback(ref);

      return !ref
        ? null
        : this.setSelectorRef(selector, ref);
    }
  }

  getRefWrapper (selector) {
    return (callback) => this.getRefSetter(selector, callback);
  }

  getStyles () {
    const { definition } = this.state;
    const { getContextMethods, theme } = this;

    const stylesheet = isFunction(definition)
      ? definition(getContextMethods(), theme)
      : definition;

    const parsed = isObject(stylesheet)
      ? stylesheet
      : parseStylesheetDocument(stylesheet);

    return homogenizeStylesheet(parsed);
  }

  getStyleProps () {
    const styles = this.getStyles();
    const selectors = Object.keys(styles);
    const reduceSelectors = deriveValue => selectors.reduce((out, selector) => (
      { ...out, [selector]: deriveValue(selector) }
    ), {});

    const styledRefs = reduceSelectors(this.getRefSetter);
    const styleRefWrappers = reduceSelectors(this.getRefWrapper);
    const styledProps = reduceSelectors(sel => ({
      style: styles[sel],
      ref: styledRefs[sel]
    }));

    return { styles, styledProps, styledRefs, styleRefWrappers };
  }

  getComponentWrapper () {
    const subscribeToStyleSheet = this.subscribe;
    const styleProps = this.getStyleProps();

    return (wrappableComponent) => (props) => {
      const subProps = { ...props, ...styleProps }

      return React.createElement(StyledComponentWrapper, {
        subProps,
        wrappableComponent,
        subscribeToStyleSheet
      });
    };
  }
};

export default StyleSheet;
