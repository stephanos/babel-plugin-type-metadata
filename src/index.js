/* eslint no-param-reassign: 0 */

import serializer from './serializer';

function defineMetadata(t, path, type) {
  const classPath = path.parentPath.parentPath;

  if (path.node.kind === 'constructor') {
    type = t.typeAnnotation(t.genericTypeAnnotation(classPath.node.id));
  }
  if (!type) {
    return;
  }

  let typeDescriptor = null;
  try {
    typeDescriptor = serializer(t, type, path.node.value);
  } catch (e) {
    // throw path.buildCodeFrameError('unable to serialize type');
  }

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
