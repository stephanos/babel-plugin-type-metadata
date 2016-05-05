export default function serializer(t, type, acc = t.objectExpression([])) {
  switch (type.type) {
    case 'NullableTypeAnnotation':
      acc.properties.push(
        t.objectProperty(t.identifier('nullable'), t.booleanLiteral(true))
      );
      return serializer(t, type.typeAnnotation, acc);

    case 'TypeAnnotation':
      return serializer(t, type.typeAnnotation, acc);

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

    default:
      throw new Error('unknown type');
  }

  return acc;
}
