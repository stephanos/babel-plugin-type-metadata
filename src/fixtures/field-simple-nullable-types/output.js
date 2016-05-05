/* @flow */

class MyClass {
  booleanField: ?bool;
  numberField: ?number;
  stringField: ?string;
}

Reflect.defineMetadata("design:type", {
  type: String,
  nullable: true
}, MyClass, "stringField")
Reflect.defineMetadata("design:type", {
  type: Number,
  nullable: true
}, MyClass, "numberField")
Reflect.defineMetadata("design:type", {
  type: Boolean,
  nullable: true
}, MyClass, "booleanField")
export default MyClass;
