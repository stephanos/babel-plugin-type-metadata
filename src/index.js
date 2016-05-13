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
        let typeDescriptor;
        try {
          typeDescriptor = serializer(t, propType, path.node.value);
        } catch (e) {
          // console.log(e);
          return;
        }
        defineMetadata(t, 'prop', classPath, typeDescriptor, classPath.node.id, path.node.key.name);
      },
      ClassMethod(path) {
        const classPath = path.parentPath.parentPath;
        let returnType = path.node.returnType;
        if (path.node.kind === 'constructor') {
          returnType = t.typeAnnotation(t.genericTypeAnnotation(classPath.node.id));
        }

        let typeDescriptor;
        try {
          typeDescriptor = t.objectExpression([
            t.objectProperty(
              t.identifier('returns'),
              serializer(t, returnType)
            ),
            t.objectProperty(
              t.identifier('parameters'),
              t.arrayExpression(path.node.params.map((p) => serializer(t, p.typeAnnotation)))
            ),
          ]);
        } catch (e) {
          // console.log(e);
          return;
        }

        defineMetadata(t, path.node.kind, classPath, typeDescriptor, classPath.node.id, path.node.key.name);
      },
      TypeAlias(path) {
        let typeDescriptor;
        try {
          typeDescriptor = serializer(t, path.node.right);
        } catch (e) {
          // console.log(e);
          return;
        }

        defineMetadata(t, 'alias', path, typeDescriptor, t.identifier('module'), path.node.id.name);
      },
    },
  };
}
