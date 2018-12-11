import { COMMENT_PATTERNS } from './constants';

// Type utils ============================================================|
export function isString (value) {
  return typeof value === 'string';
}

export function isFunction (value) {
  return typeof value === 'function';
}

export function isObject (value) {
  return typeof value === 'object'
    && !Array.isArray(value)
    && !(value instanceof RegExp);
}

export function isNumber (value) {
  return typeof value === 'number';
}

export function isRegex (value) {
  return value instanceof RegExp;
}

// Misc. Utils ========================================================|

export function getFakeContextMethods () {
  return {
    widerThan: () => null,
    narrowerThan: () => null,
    tallerThan: () => null,
    shorterThan: () => null,
    is: () => null
  };
}

export function trim (value) {
  return isString(value) ? value.trim() : value;
}

export function replaceExcept (value, exceptionPattern, maskChar, replacePattern, replaceWith) {
  if (!isString(value)) {
    console.warn('replaceExcept() called with invalid value (must be <String>):', value);
    return value;
  } else if (!isRegex(exceptionPattern)) {
    console.warn('replaceExcept() called with invalid exceptionPattern (must be <RegEx>):', exceptionPattern);
    return value;
  } else if (!isString(maskChar) || maskChar.length !== 1) {
    console.warn('replaceExcept() called with invalid maskChar (must be 1-char <String>):', maskChar);
    return value;
  } else if (!isRegex(replacePattern)) {
    console.warn('replaceExcept() called with invalid replacePattern (must be <RegEx>):', replacePattern);
    return value;
  } else if (!isString(replaceWith) && !isFunction(replaceWith) && !isNumber(replaceWith)) {
    console.warn('replaceExcept() called with invalid replaceWith (must be <String|Function|Number>):', replaceWith);
    return value;
  }

  const withoutException = value.replace(exceptionPattern, exception => maskChar.repeat(exception.length));
  const replacementIndexesAndLengths = [];

  let cursor;
  let lastPosition = 0;

  while ((cursor = replacePattern.exec(withoutException.substring(lastPosition))) !== null) {
    replacementIndexesAndLengths.push({
      index: cursor.index + lastPosition,
      length: cursor[0].length
    });
    lastPosition += cursor.index + cursor[0].length;
  }

  return replacementIndexesAndLengths
    .reverse()
    .reduce((output, indexAndLengthToBeReplaced) => {
      const { index, length } = indexAndLengthToBeReplaced;
      const replacement = isFunction(replaceWith)
        ? replaceWith(output.substring(index, index + length))
        : replaceWith;

      return output.substring(0, index) + replacement + output.substring(index + length);
    }, value);
}

export function stripComments (value) {
  if (!isString(value))
    return value;

  const { QUOTED_TEXT, SINGLE_LINE, MULTI_LINE } = COMMENT_PATTERNS;

  const withoutMultiLines = replaceExcept(value, QUOTED_TEXT, '-', MULTI_LINE, '');
  const withoutSingleLines = replaceExcept(withoutMultiLines, QUOTED_TEXT, '-', SINGLE_LINE, '');

  return withoutSingleLines;
}

export function stringify (value) {
  return JSON.stringify(value, null, '  ');
}

export function attachListeners (element, events, callback) {
  events.forEach(eventName => {
    element.addEventListener(eventName, callback);
  });
}

export function detachListeners (element, events, callback) {
  events.forEach(eventName => {
    element.removeEventListener(eventName, callback);
  });
}

export const debounce = (fn, delay = 50) => {
  var instance = null;

  return () => {
    if (instance) clearTimeout(instance);

    instance = setTimeout(fn, delay);

    return instance;
  };
}

export function merge (...pieces) {
  const validPieces = pieces.filter(isObject);

  return Object.assign({}, ...validPieces);
}

export function splitBy (value, splitByChar = '') {
  return !isString(value)
    ? value
    : value
      .split(splitByChar)
      .map(t => t.trim())
      .filter(t => t && t.length);
}

export function lcFirst (text) {
  return text && text.length
    ? text[0].toLowerCase() + text.substring(1)
    : text;
}

export function ucFirst (text) {
  return text && text.length
    ? text[0].toUpperCase() + text.substring(1)
    : text;
}

export function forceCamelCase (value) {
  if (!isString(value))
    return value;

  return splitBy(value, '-')
    .map((str, i) => !i ? lcFirst(str) : ucFirst(str))
    .join('');
}
