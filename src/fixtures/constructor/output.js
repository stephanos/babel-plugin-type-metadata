/* @flow */

class MyClass {
  constructor() {
    this.foo = 'bar';
  }
}

Reflect.defineMetadata('typeof', {
  kind: 'constructor',
  returns: {
    type: MyClass
  },
  parameters: []
}, MyClass, 'constructor')
export default MyClass;
