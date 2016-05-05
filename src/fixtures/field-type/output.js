/* @flow */

class MyClass {
  numberField: number;
  stringField: string;
}

Reflect.defineMetadata("typeof", {
  type: String
}, MyClass, "stringField")
Reflect.defineMetadata("typeof", {
  type: Number
}, MyClass, "numberField")
export default MyClass;
