import assert from 'assert';
import * as t from 'babel-types';
import generate from 'babel-generator';

import serializer from './serializer';


describe('serialize', () => {
  it('a string', () => {
    const descr = serializer(t, { typeAnnotation: { type: 'StringTypeAnnotation' } });
    assert.equal(generate(descr).code, 'String');
  });

  it('a number', () => {
    const descr = serializer(t, { typeAnnotation: { type: 'NumberTypeAnnotation' } });
    assert.equal(generate(descr).code, 'Number');
  });
});
