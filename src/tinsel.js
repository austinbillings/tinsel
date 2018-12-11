import React from 'react';

/*|=========================================================================|*\
|*|                                  Tinsel                                 |*|
|*|                                  by AJB                                 |*|
\*|=========================================================================|*/

import StyleSheet from './classes/StyleSheet';
import { parseStylePropertyList } from './parsers';
import { isString, isObject, stringify } from './utils';
import { homogenizePropertyList, stringifyPropertyList } from './processing';
import { isValidTCSSPropertyList, isValidTCSSPropertyListString } from './validation';

export function createMixin (definition) {
  if (!isString(definition) && !isObject(definition))
    throw new TypeError(`mixin <${typeof definition}> is of wrong type; should be {string|object}`);
  if (isString(definition) && !isValidTCSSPropertyListString(definition))
    throw new TypeError(`mixin <string> is improperly formatted: ${definition}`);
  if (isObject(definition) && !isValidTCSSPropertyList(definition))
    throw new TypeError(`mixin <object> is imporperly formatted: ${stringify(definition)}`);

  const mixin = homogenizePropertyList(isString(definition)
    ? parseStylePropertyList(definition)
    : definition
  );

  return (additionalStyles) => {
    return {
      ...mixin,
      toString: function () {
        return stringifyPropertyList(mixin);
      }
    }
  }
}

export function createStyleSheet (styles) {
  return new StyleSheet(styles);
}

export function connectStyle (styles) {
  return createStyleSheet(styles).getComponentWrapper();
}

export function createTheme (theme = {}) {
  if (!isObject(theme))
    throw new TypeError(`Tinsel#createTheme(): theme is not an object: ${theme}`);

  function createStyleSheet (styles) {
    return new StyleSheet(styles, theme);
  }

  function connectStyle (styles) {
    return createStyleSheet(styles).getComponentWrapper();
  }

  return { createStyleSheet, connectStyle };
};
