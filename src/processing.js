
import { isValidTCSSObject, isValidTCSSPropertyList } from './validation';
import { isObject, isNumber, forceCamelCase, stringify } from './utils';

export function homogenizePropertyList (propertyList) {
  return Object.keys(propertyList)
    .reduce((output, propertyName) => {
      const propertyValue = propertyList[propertyName];
      const homogenizedName = forceCamelCase(propertyName);

      return {
        ...output,
        [homogenizedName]: isNumber(propertyValue)
          ? propertyValue + 'px'
          : propertyValue
      };
    }, {});
}

export function homogenizeStylesheet (stylesheet) {
  if (!isObject(stylesheet) || !isValidTCSSObject(stylesheet))
    throw new TypeError(`homogenizeStylesheet() expects stylesheet to be a valid stylesheet object: ${stringify(stylesheet)}`);

  return Object.keys(stylesheet)
    .reduce((output, selector) => ({
      ...output,
      [selector]: homogenizePropertyList(stylesheet[selector])
    }), {});
}

export function stringifyPropertyList (propertyList) {
  if (!isObject(propertyList))
    throw new TypeError(`stringifyPropertyList() expects propertyList to be an <object> (got ${typeof propertyList})`);
  if (!isValidTCSSPropertyList(propertyList))
    throw new TypeError(`stringifyPropertyList() expects propertyList to be a valid propertyList object: ${stringify(propertyList)}`);

  return Object.keys(propertyList)
    .reduce((output, propertyName) => (
      output.concat(propertyName + ': ' + propertyList[propertyName] + ';')
    ), '');
}
