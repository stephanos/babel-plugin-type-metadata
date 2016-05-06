/* @flow */

class MyClass {
  stringMethod(): string {
    return 'string';
  }

  numberMethod(): number {
    return 42;
  }
}

Reflect.defineMetadata('typeof', {
  kind: 'method',
  returns: {
    type: Number
  },
  parameters: []
}, MyClass, 'numberMethod')
Reflect.defineMetadata('typeof', {
  kind: 'method',
  returns: {
    type: String
  },
  parameters: []
}, MyClass, 'stringMethod')
export default MyClass;
