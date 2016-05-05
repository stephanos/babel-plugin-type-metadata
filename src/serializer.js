export default function serializer(t, type, valueType, acc = t.objectExpression([])) {
  switch (type ? type.type : null) {
    case 'NullableTypeAnnotation':
      acc.properties.push(
        t.objectProperty(t.identifier('nullable'), t.booleanLiteral(true))
      );
      return serializer(t, type.typeAnnotation, null, acc);

    case 'TypeAnnotation':
      return serializer(t, type.typeAnnotation, null, acc);

    // ==== primitives:

    case 'BooleanTypeAnnotation':
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier('Boolean'))
      );
      break;

    case 'NumberTypeAnnotation':
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier('Number'))
      );
      break;

    case 'StringTypeAnnotation':
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier('String'))
      );
      break;

    case 'VoidTypeAnnotation':
      acc.properties.unshift(
        t.objectProperty(t.identifier('type'), t.identifier('undefined'))
      );
      break;

    default:
      switch (valueType ? valueType.type : null) {
        case 'NumericLiteral':
          acc.properties.unshift(
            t.objectProperty(t.identifier('type'), t.identifier('Number'))
          );
          break;
        default:
          throw new Error('unknown type');
      }
  }

  return acc;
}
