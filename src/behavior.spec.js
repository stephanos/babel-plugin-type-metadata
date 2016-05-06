/* eslint global-require:0 */

import path from 'path';
import assert from 'assert';
import Reflect from 'core-js/es7/reflect';

function load(dir) {
  return require(path.join(__dirname, 'fixtures', dir, 'output.es6.js'));
}

describe('query type metadata', () => {
  describe('of a field', () => {
    it('should return metadata', () => {
      const MyClass = load('field-type').default;

      assert.deepEqual(Reflect.getMetadata('typeof', MyClass, 'stringField'),
        { kind: 'prop', type: String });
    });
  });

  describe('of a method', () => {
    it('should return metadata', () => {
      const MyClass = load('method-type').default;

      assert.deepEqual(Reflect.getMetadata('typeof', MyClass, 'stringMethod'),
        { kind: 'method', returns: { type: String }, parameters: [] });
    });
  });
});
