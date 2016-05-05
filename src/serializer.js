export default function serializer(t, type) {
  switch (type.typeAnnotation.type) {
    case 'BooleanTypeAnnotation':
      return t.identifier('Boolean');
    case 'NumberTypeAnnotation':
      return t.identifier('Number');
    case 'StringTypeAnnotation':
      return t.identifier('String');
    default:
      return null;
  }
}
