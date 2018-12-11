import { isObject, splitBy } from './utils';
import { isValidTCSSPropertyListString, isValidTCSSDocument } from './validation';

export function parseStylePropertyList (propertyList) {
  if (!isValidTCSSPropertyListString(propertyList))
    throw new TypeError(`propertyList <string> parsed is improperly formatted: ${propertyList}`)

  const properties = splitBy(propertyList, ';')
    .map(property => {
      const [ name, value ] = splitBy(property, ':');
      return { name, value };
    });

  return properties;
}

export function parseStylesheetDocument (stylesheet) {
  if (!isValidTCSSDocument(stylesheet))
    throw new TypeError(`stylesheet <string> parsed is improperly formatted: ${stylesheet}`);

  return splitBy(stylesheet, '}')
    .map(section => {
      const [ selectorsText, propertiesText ] = splitBy(section, '{');

      const selectors = splitBy(selectorsText, ',');
      const properties = parseStylePropertyList(propertiesText);

      return { selectors, properties };
    })
    .reduce((output, section) => {
      section.selectors.forEach(selector => {
        if (!isObject(output[selector]))
          output[selector] = {};

        section.properties.forEach(property => {
          output[selector][property.name] = property.value;
        });
      });

      return output;
    }, {});
}
