/* @flow */

class MyClass {
  constructor(param: ?string) {
    this.foo = 'bar';
  }
}

Reflect.defineMetadata('typeof', {
  kind: 'constructor',
  returns: {
    type: MyClass
  },
  parameters: [{
    type: String,
    nullable: true
  }]
}, MyClass, 'constructor')
export default MyClass;
