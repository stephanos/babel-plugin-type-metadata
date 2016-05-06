/* @flow */

class MyClass {
  method(param: string): string {
    this.foo = 'bar';
  }
}

Reflect.defineMetadata('typeof', {
  returns: {
    type: String
  },
  parameters: [{
    type: String
  }]
}, MyClass, 'method')
export default MyClass;
