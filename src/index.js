import serializer from './serializer';

function defineMetadata(t, path) {
  const type = path.node.typeAnnotation;
  if (!type) {
    return;
  }

  const typeDescriptor = serializer(t, type);
  if (!typeDescriptor) {
    throw path.buildCodeFrameError('unable to serialize type');
  }

  const classPath = path.parentPath.parentPath;
  classPath.insertAfter(
    t.callExpression(
      t.memberExpression(
        t.identifier('Reflect'), t.identifier('defineMetadata')
      ), [
        t.stringLiteral('design:type'),
        typeDescriptor,
        classPath.node.id,
        t.stringLiteral(path.node.key.name),
      ]
    )
  );
}

export default function ({ types: t }) {
  return {
    visitor: {
      ClassProperty(path) {
        defineMetadata(t, path);
      },
    },
  };
}
