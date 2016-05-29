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
  }
}, MyClass, 'constructor')
export default MyClass;
