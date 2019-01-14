"use strict";

const LayoutAttributes = [
  'display',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'flexDirection',
  'flexWrap',
  'flexFlow',
  'order',
  'justifyContent',
  'alignItems',
  'alignSelf',
  'alignContent',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'float',
];

module.exports = ({ types: t }) => {
  function buildStyleAttribute(objectProperties) {
    const styleId = t.jsxIdentifier('style');
    const styleContainer = t.jsxExpressionContainer(
      t.objectExpression(objectProperties),
    );

    return t.jsxAttribute(styleId, styleContainer);
  }

  function buildObjectPropertyFromJSXAttribute(attribute) {
    const value = t.isJSXExpressionContainer(attribute.value)
      ? attribute.value.expression : attribute.value;

    return t.objectProperty(t.Identifier(attribute.name.name), value);
  }

  function isLayoutAttribute(attribute) {
    return attribute.name && LayoutAttributes.indexOf(attribute.name.name) > -1;
  }

  function isInlineStyleAttribute(attribute) {
    return attribute.name.name === 'style';
  }

  return {
    visitor: {
      JSXOpeningElement(path) {
        const { node } = path;
        const { attributes } = node;

        const layoutAttributes = attributes.filter(isLayoutAttribute);
        if (!layoutAttributes.length) {
          return;
        }

        const nonLayoutAttributes = attributes.filter(attribute => !isLayoutAttribute(attribute) && !isInlineStyleAttribute(attribute));
        const inlineStyleAttributes = attributes.filter(isInlineStyleAttribute);
        const styleProperties = inlineStyleAttributes.length ? [...inlineStyleAttributes[0].value.expression.properties] : [];

        // Existing inline styles will be overridden by layout attributes because latter duplicate styles take precedence.
        const objectProperties = [...styleProperties, ...layoutAttributes.map((layoutAttribute) => {
          return buildObjectPropertyFromJSXAttribute(layoutAttribute);
        })];

        const newStyleAttribute = buildStyleAttribute(objectProperties);
        node.attributes = [newStyleAttribute, ...nonLayoutAttributes];
      },
    },
  };
};
