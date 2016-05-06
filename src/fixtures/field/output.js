/* @flow */

class MyClass {
  numberField: number;
  stringField: string;
}

Reflect.defineMetadata("typeof", {
  kind: "prop",
  type: String
}, MyClass, "stringField")
Reflect.defineMetadata("typeof", {
  kind: "prop",
  type: Number
}, MyClass, "numberField")
export default MyClass;
