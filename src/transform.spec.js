import fs from 'fs';
import path from 'path';
import assert from 'assert';
import plugin from './index';
import { transform } from 'babel-core';


const REQUIRED_PLUGINS = [
  'babel-plugin-syntax-flow',
  'babel-plugin-syntax-decorators',
  'babel-plugin-syntax-class-properties',
];

function transpile(input, pluginOpts = {}) {
  const plugins = REQUIRED_PLUGINS.slice();
  plugins.push([plugin, pluginOpts]);
  const options = { plugins };
  return transform(input, options).code;
}

function testFixture(dir, pluginOpts = {}) {
  const fixtureDir = path.join(__dirname, 'fixtures', dir);
  const actual = transpile(fs.readFileSync(path.join(fixtureDir, 'input.js'), 'utf8'), pluginOpts);
  const expected = fs.readFileSync(path.join(fixtureDir, 'output.js'), 'utf8');
  assert.equal(actual.trim(), expected.trim());
}


describe('applying transformer to', () => {
  describe('a class', () => {
    describe('with typed fields', () => {
      it('should define metadata', () => {
        testFixture('field');
      });
    });

    describe('with typed methods', () => {
      it('should define metadata', () => {
        testFixture('method');
      });
    });

    describe('with typed accessor', () => {
      it('should define metadata', () => {
        testFixture('accessor');
      });
    });
  });

  describe('a type alias', () => {
    it('should define metadata', () => {
      testFixture('type-alias');
    });
  });

  describe('a non-decorated class', () => {
    it('should not modify the input', () => {
      testFixture('non-typed');
    });
  });
});
