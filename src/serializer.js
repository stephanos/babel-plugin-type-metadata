export default function serializer(t, type) {
  switch (type.typeAnnotation.type) {
    case 'StringTypeAnnotation':
      return t.identifier('String');
    default:
      return null;
  }
}
