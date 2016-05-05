import serializer from './serializer';

function defineMetadata(t, path, type) {
  if (!type) {
    return;
  }

  let typeDescriptor = null;
  try {
    typeDescriptor = serializer(t, type);
  } catch (e) {
    throw path.buildCodeFrameError('unable to serialize type');
  }

  const classPath = path.parentPath.parentPath;
  classPath.insertAfter(
    t.callExpression(
      t.memberExpression(
        t.identifier('Reflect'), t.identifier('defineMetadata')
      ), [
        t.stringLiteral('typeof'),
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
        defineMetadata(t, path, path.node.typeAnnotation);
      },
      ClassMethod(path) {
        defineMetadata(t, path, path.node.returnType);
      },
    },
  };
}
