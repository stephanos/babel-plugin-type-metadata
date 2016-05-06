/* @flow */

class MyClass {
  constructor() {
    this.foo = 'bar';
  }
}

Reflect.defineMetadata('typeof', {
  type: MyClass
}, MyClass, 'constructor')
export default MyClass;
