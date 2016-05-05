/* @flow */

class MyClass {
  booleanField: bool;
  numberField: number;
  stringField: string;
}

Reflect.defineMetadata("design:type", {
  type: String
}, MyClass, "stringField")
Reflect.defineMetadata("design:type", {
  type: Number
}, MyClass, "numberField")
Reflect.defineMetadata("design:type", {
  type: Boolean
}, MyClass, "booleanField")
export default MyClass;