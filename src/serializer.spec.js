import assert from 'assert';
import * as t from 'babel-types';
import generate from 'babel-generator';

import serializer from './serializer';


function serialize(input, value) {
  const ast = serializer(t, input, value);
  return generate(ast, {
    concise: true,
  }).code;
}

describe('serialize', () => {
  describe('a boolean', () => {
    it('that is non-null', () => {
      const descr = serialize({
        type: 'BooleanTypeAnnotation' });
      assert.equal(descr, '{ type: Boolean }');
    });

    it('that is nullable', () => {
      const descr = serialize({
        type: 'NullableTypeAnnotation',
        typeAnnotation: { type: 'BooleanTypeAnnotation' } });
      assert.equal(descr, '{ type: Boolean, nullable: true }');
    });

    it('that is a literal', () => {
      const descr = serialize(undefined, {
        type: 'BooleanLiteral' });
      assert.equal(descr, '{ type: Boolean }');
    });
  });

  describe('a number', () => {
    it('that is non-null', () => {
      const descr = serialize({
        type: 'NumberTypeAnnotation' });
      assert.equal(descr, '{ type: Number }');
    });

    it('that is nullable', () => {
      const descr = serialize({
        type: 'NullableTypeAnnotation',
        typeAnnotation: { type: 'NumberTypeAnnotation' } });
      assert.equal(descr, '{ type: Number, nullable: true }');
    });

    it('that is a literal', () => {
      const descr = serialize(undefined, {
        type: 'NumericLiteral' });
      assert.equal(descr, '{ type: Number }');
    });
  });

  describe('a string', () => {
    it('that is non-null', () => {
      const descr = serialize({
        type: 'StringTypeAnnotation' });
      assert.equal(descr, '{ type: String }');
    });

    it('that is nullable', () => {
      const descr = serialize({
        type: 'NullableTypeAnnotation',
        typeAnnotation: { type: 'StringTypeAnnotation' } });
      assert.equal(descr, '{ type: String, nullable: true }');
    });

    it('that is a literal', () => {
      const descr = serialize(undefined, {
        type: 'StringLiteral' });
      assert.equal(descr, '{ type: String }');
    });

    it('that is a template literal', () => {
      const descr = serialize(undefined, {
        type: 'TemplateLiteral' });
      assert.equal(descr, '{ type: String }');
    });
  });

  it('a void type', () => {
    const descr = serialize({
      type: 'VoidTypeAnnotation' });
    assert.equal(descr, '{ type: undefined }');
  });

  it('an any type', () => {
    const descr = serialize({
      type: 'AnyTypeAnnotation' });
    assert.equal(descr, '{ type: Object }');
  });

  describe('a regular expression', () => {
    it('type declaration', () => {
      const descr = serialize({
        type: 'GenericTypeAnnotation', id: { name: 'RegExp' } });
      assert.equal(descr, '{ type: RegExp }');
    });

    it('that is a literal', () => {
      const descr = serialize(undefined, {
        type: 'RegExpLiteral' });
      assert.equal(descr, '{ type: RegExp }');
    });
  });

  describe('an array', () => {
    it('type declaration', () => {
      const descr = serialize({
        type: 'GenericTypeAnnotation',
        id: { name: 'Array' },
        typeParameters: {
          type: 'TypeParameterInstantiation',
          params: [{ type: 'StringTypeAnnotation' }] },
      });
      assert.equal(descr, '{ type: Array, typeParameters: [{ type: String }] }');
    });
  });

  describe('an object', () => {
    it('type declaration', () => {
      const descr = serialize({
        type: 'GenericTypeAnnotation',
        id: { name: 'Object' },
      });
      assert.equal(descr, '{ type: Object }');
    });
  });

  describe('a function', () => {
    it('type declaration', () => {
      const descr = serialize({
        type: 'FunctionTypeAnnotation',
        returnType: { type: 'StringTypeAnnotation' },
        params: [{ type: 'StringTypeAnnotation' }, { type: 'StringTypeAnnotation' }],
      });
      assert.equal(descr,
        '{ type: Function, returns: { type: String }, parameters: [{ type: String }, { type: String }] }');
    });
  });

  describe('a union', () => {
    it('type declaration', () => {
      const descr = serialize({
        type: 'UnionTypeAnnotation',
        types: [{ type: 'StringTypeAnnotation' }, { type: 'NumberTypeAnnotation' }],
      });
      assert.equal(descr, '{ kind: "union", types: [{ type: String }, { type: Number }] }');
    });
  });

  describe('an intersection', () => {
    it('type declaration', () => {
      const descr = serialize({
        type: 'IntersectionTypeAnnotation',
        types: [{ type: 'StringTypeAnnotation' }, { type: 'NumberTypeAnnotation' }],
      });
      assert.equal(descr, '{ kind: "intersection", types: [{ type: String }, { type: Number }] }');
    });
  });
});
