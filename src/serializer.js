export default function serializer(t, type) {
  switch (type.typeAnnotation.type) {
    case 'StringTypeAnnotation':
      return t.identifier('String');
    case 'NumberTypeAnnotation':
      return t.identifier('Number');
    default:
      return null;
  }
}
