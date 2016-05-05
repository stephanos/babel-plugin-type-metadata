/* @flow */

class MyClass {
  field: string;
}

Reflect.defineMetadata("design:type", String, MyClass, "field")
export default MyClass;
