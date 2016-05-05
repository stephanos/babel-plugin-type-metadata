/* @flow */

class MyClass {
  numberField: number;
  stringField: string;
}

Reflect.defineMetadata("design:type", {
  type: String
}, MyClass, "stringField")
Reflect.defineMetadata("design:type", {
  type: Number
}, MyClass, "numberField")
export default MyClass;
