// Type utils ============================================================|

export function isString (value) {
  return typeof value === 'string';
}

export function isFunction (value) {
  return typeof value === 'function';
}

export function isObject (value) {
  return typeof value === 'object'
    && !Array.isArray(value);
}

export function isNumber (value) {
  return typeof value === 'number';
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
