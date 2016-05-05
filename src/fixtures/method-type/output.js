/* @flow */

class MyClass {
  stringMethod(): string {
    return 'string';
  }

  numberMethod(): number {
    return 42;
  }
}

Reflect.defineMetadata('design:type', {
  type: Number
}, MyClass, 'numberMethod')
Reflect.defineMetadata('design:type', {
  type: String
}, MyClass, 'stringMethod')
export default MyClass;
