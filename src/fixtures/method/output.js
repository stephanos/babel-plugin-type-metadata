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
  }
}, MyClass, 'numberMethod')
Reflect.defineMetadata('typeof', {
  kind: 'method',
  returns: {
    type: String
  }
}, MyClass, 'stringMethod')
export default MyClass;
