/* eslint no-use-before-define: 0 */

function serializeValueType(t, valueType, acc) {
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
    throw new Error('unknown value type');
  }

  return acc;
}

function serializeCombinedType(t, type, acc) {
  const kind = t.isUnionTypeAnnotation(type) ? 'union' : 'intersection';
  acc.properties.push(
    t.objectProperty(t.identifier('kind'), t.stringLiteral(kind)),
    t.objectProperty(t.identifier('types'), t.arrayExpression(
      type.types.map((tt) => serializer(t, tt))
    ))
  );
  return acc;
}

function serializeSimpleType(t, type, acc) {
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
  } else if (t.isAnyTypeAnnotation(type)) {
    acc.properties.unshift(
      t.objectProperty(t.identifier('type'), t.identifier('Object'))
    );
  } else if (t.isFunctionTypeAnnotation(type)) {
    acc.properties.unshift(
      t.objectProperty(t.identifier('type'), t.identifier('Function'))
    );

    acc.properties.push(
      t.objectProperty(t.identifier('returns'), serializer(t, type.returnType))
    );

    acc.properties.push(
      t.objectProperty(
        t.identifier('parameters'),
        t.arrayExpression(type.params.map((p) => serializer(t, p)))
      )
    );
  } else if (t.genericTypeAnnotation(type) && type.id) {
    acc.properties.unshift(
      t.objectProperty(t.identifier('type'), t.identifier(type.id.name))
    );

    if (type.typeParameters) {
      acc.properties.push(
        t.objectProperty(
          t.identifier('typeParameters'),
          t.arrayExpression(type.typeParameters.params.map((p) => serializer(t, p)))
        )
      );
    }
  } else {
    throw new Error('unknown type');
  }

  return acc;
}

function serializer(t, type, valueType, acc = t.objectExpression([])) {
  if (!type) {
    return serializeValueType(t, valueType, acc);
  }

  if (type.types) {
    return serializeCombinedType(t, type, acc);
  }

  if (t.isNullableTypeAnnotation(type)) {
    acc.properties.push(
      t.objectProperty(t.identifier('nullable'), t.booleanLiteral(true))
    );
    return serializer(t, type.typeAnnotation, null, acc);
  }

  if (t.isTypeAnnotation(type)) {
    return serializer(t, type.typeAnnotation, null, acc);
  }

  return serializeSimpleType(t, type, acc);
}


export default serializer;
