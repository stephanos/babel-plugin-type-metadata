/* @flow */

class MyClass {
  stringField: string;
  numberField: number;
}

Reflect.defineMetadata("design:type", Number, MyClass, "numberField")
Reflect.defineMetadata("design:type", String, MyClass, "stringField")
export default MyClass;
