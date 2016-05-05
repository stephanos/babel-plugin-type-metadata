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
  type: Number
}, MyClass, 'numberMethod')
Reflect.defineMetadata('typeof', {
  type: String
}, MyClass, 'stringMethod')
export default MyClass;
