export const INTERACTION_EVENTS = [
  'blur',
  'focus',
  'click',
  'mouseup',
  'mousedown',
  'mouseleave',
  'mouseenter'
];

export const VALIDATION_PATTERNS = {
  TCSS_DOCUMENT: /^\s*(?:([a-zA-Z_][a-zA-Z0-9_]*)(?:,\s*[a-zA-Z_][a-zA-Z0-9_]*)*\s*{(?:\s*[a-z][a-zA-Z-]+:\s*[a-zA-Z0-9@#%()".,_-\s]+;)+\s*}\s*)+\s*$/,
  TCSS_SELECTOR: /^([a-zA-Z_][a-zA-Z0-9]*)$/,
  TCSS_PROPERTY_NAME: /^[a-z][a-zA-Z-]+$/,
  TCSS_PROPERTY_VALUE: /^[a-zA-Z0-9@#%()".,_-\s]+$/,
  TCSS_PROPERTY_LIST: /^(?:\s*[a-z][a-zA-Z-]+:\s*[a-zA-Z0-9@#%()".,_-\s]+;)+$/
};
