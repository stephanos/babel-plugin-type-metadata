/* @flow */

class MyClass {
  constructor() {
    this.foo = 'bar';
  }
}

Reflect.defineMetadata('typeof', {
  returns: {
    type: MyClass
  },
  parameters: []
}, MyClass, 'constructor')
export default MyClass;
