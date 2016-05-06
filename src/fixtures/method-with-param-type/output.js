/* @flow */

class MyClass {
  method(param: string): string {
    this.foo = 'bar';
  }
}

Reflect.defineMetadata('typeof', {
  kind: 'method',
  returns: {
    type: String
  },
  parameters: [{
    type: String
  }]
}, MyClass, 'method')
export default MyClass;
