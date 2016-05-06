export default function serializer(t, type, valueType, acc = t.objectExpression([])) {
  if (!type) {
    if (t.isBooleanLiteral(valueType)) {
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier('Boolean'))
      );
    } else if (t.isNumericLiteral(valueType)) {
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier('Number'))
      );
    } else if (t.isStringLiteral(valueType) || t.isTemplateLiteral(valueType)) {
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier('String'))
      );
    } else if (t.isRegExpLiteral(valueType)) {
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier('RegExp'))
      );
    } else {
      throw new Error('unknown type');
    }
  } else {
    if (t.isNullableTypeAnnotation(type)) {
      acc.properties.push(
        t.objectProperty(t.identifier('nullable'), t.booleanLiteral(true))
      );
      return serializer(t, type.typeAnnotation, null, acc);
    }

    if (t.isTypeAnnotation(type)) {
      return serializer(t, type.typeAnnotation, null, acc);
    }

    if (t.isBooleanTypeAnnotation(type)) {
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier('Boolean'))
      );
    } else if (t.isNumberTypeAnnotation(type)) {
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier('Number'))
      );
    } else if (t.isStringTypeAnnotation(type)) {
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier('String'))
      );
    } else if (t.isVoidTypeAnnotation(type)) {
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier('undefined'))
      );
    } else if (t.genericTypeAnnotation(type)) {
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier(type.id.name))
      );
    } else {
      throw new Error('unknown type');
    }
  }

  return acc;
}
