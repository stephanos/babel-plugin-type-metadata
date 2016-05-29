/* eslint no-param-reassign: 0 */

import serializer from './serializer';

function defineMetadata(t, kind, nodePath, typeDescriptor, target, targetKey) {
  typeDescriptor.properties.unshift(
    t.objectProperty(t.identifier('kind'), t.stringLiteral(kind))
  );
  nodePath.insertAfter(
    t.callExpression(
      t.memberExpression(
        t.identifier('Reflect'), t.identifier('defineMetadata')
      ), [
        t.stringLiteral('typeof'),
        typeDescriptor,
        target,
        t.stringLiteral(targetKey),
      ]
    )
  );
}

export default function ({ types: t }) {
  return {
    visitor: {
      ClassProperty(path) {
        const propType = path.node.typeAnnotation;
        if (!propType) {
          return;
        }

        const classPath = path.parentPath.parentPath;
        const typeDescriptor = serializer(t, propType, path.node.value);
        defineMetadata(t, 'prop', classPath, typeDescriptor, classPath.node.id, path.node.key.name);
      },
      ClassMethod(path) {
        const classPath = path.parentPath.parentPath;
        const returnType = path.node.returnType;
        if (!returnType) {
          return;
        }

        if (path.node.kind === 'set') {
          return;
        }

        const typeDescriptor = t.objectExpression([
          t.objectProperty(
            t.identifier('returns'),
            serializer(t, returnType)
          ),
        ]);

        defineMetadata(t, path.node.kind, classPath, typeDescriptor, classPath.node.id, path.node.key.name);
      },
      TypeAlias(path) {
        const typeDescriptor = t.objectExpression([
          t.objectProperty(t.identifier('definition'), serializer(t, path.node.right)),
        ]);

        defineMetadata(t, 'alias', path, typeDescriptor, t.identifier('module'), path.node.id.name);
      },
    },
  };
}
