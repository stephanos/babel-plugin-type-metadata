import assert from 'assert';
import * as t from 'babel-types';
import generate from 'babel-generator';

import serializer from './serializer';


function serialize(input) {
  const ast = serializer(t, input);
  return generate(ast, {
    concise: true,
  }).code;
}

describe('serialize', () => {
  it('a boolean', () => {
    const descr = serialize({ type: 'BooleanTypeAnnotation' });
    assert.equal(descr, '{ type: Boolean }');
  });

  it('a nullable boolean', () => {
    const descr = serialize({ type: 'NullableTypeAnnotation', typeAnnotation: { type: 'BooleanTypeAnnotation' } });
    assert.equal(descr, '{ type: Boolean, nullable: true }');
  });

  it('a number', () => {
    const descr = serialize({ type: 'NumberTypeAnnotation' });
    assert.equal(descr, '{ type: Number }');
  });

  it('a nullable number', () => {
    const descr = serialize({ type: 'NullableTypeAnnotation', typeAnnotation: { type: 'NumberTypeAnnotation' } });
    assert.equal(descr, '{ type: Number, nullable: true }');
  });

  it('a string', () => {
    const descr = serialize({ type: 'StringTypeAnnotation' });
    assert.equal(descr, '{ type: String }');
  });

  it('a nullable string', () => {
    const descr = serialize({ type: 'NullableTypeAnnotation', typeAnnotation: { type: 'StringTypeAnnotation' } });
    assert.equal(descr, '{ type: String, nullable: true }');
  });

  it('a void', () => {
    const descr = serialize({ type: 'VoidTypeAnnotation' });
    assert.equal(descr, '{ type: undefined }');
  });
});
