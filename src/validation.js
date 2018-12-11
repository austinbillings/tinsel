import { parseStylesheetDocument } from './parsers';
import { VALIDATION_PATTERNS as patterns } from './constants';
import { isString, isNumber, isObject, isFunction, stringify, trim } from './utils';

// TCSS Validators ===========================================================|

export function isValidTCSSDocument (value) {
  return isString(value)
    && patterns.TCSS_DOCUMENT.test(trim(value));
}

export function isValidTCSSObject (value) {
  return isObject(value)
    && Object.keys(value).map(trim).every(isValidTCSSSelector)
    && Object.values(value).map(trim).every(isValidTCSSPropertyList);
}

export function isValidTCSSSelector (value) {
  return isString(value)
    && patterns.TCSS_SELECTOR.test(trim(value));
}

export function isValidTCSSPropertyList (value) {
  return isObject(value)
    && Object.keys(value).map(trim).every(isValidTCSSPropertyName)
    && Object.values(value).map(trim).every(isValidTCSSPropertyValue);
}

export function isValidTCSSPropertyListString (value) {
  return isString(value)
    && patterns.TCSS_PROPERTY_LIST.test(trim(value));
}

export function isValidTCSSPropertyName (value) {
  return isString(value)
    && patterns.TCSS_PROPERTY_NAME.test(trim(value));
}

export function isValidTCSSPropertyValue (value) {
  if (isNumber(value)) return true;

  return isString(value)
      && patterns.TCSS_PROPERTY_VALUE.test(trim(value));
}

export function validateStylesheet (stylesheet, context, theme) {
  if (isString(stylesheet)) {
    if (!isValidTCSSDocument(stylesheet))
      throw new TypeError(`stylesheet <string> given is improperly formatted: ${stylesheet}`);
    else
      return parseStylesheetDocument(stylesheet);
  }

  if (isObject(stylesheet)) {
    if (!isValidTCSSObject(stylesheet))
      throw new TypeError(`stylesheet <object> given is improperly formatted: ${stringify(stylesheet)}`);
    else
      return stylesheet;
  }

  if (isFunction(stylesheet)) {
    const output = stylesheet(context, theme);

    if (isObject(output)) {
      if (!isValidTCSSObject(output))
        throw new TypeError(`stylesheet <function> given didn't output a properly formatted stylesheet <object>: ${output}`);
      else
        return output;
    }

    if (isString(output)) {
      if (!isValidTCSSDocument(output))
        throw new TypeError(`stylesheet <function> given didn't output a properly formatted stylesheet <string>: ${output}`);
      else
        return parseStylesheetDocument(output);
    }
  }

  if (!isString(stylesheet) && !isObject(stylesheet) && !isFunction(stylesheet))
    return new TypeError(`stylesheet <${typeof stylesheet}> given is wrong type; should be <string|object|function>.`);
}
