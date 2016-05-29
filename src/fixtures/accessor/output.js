/* @flow */

class MyClass {
  get value(): string {}
}

Reflect.defineMetadata("typeof", {
  kind: "get",
  returns: {
    type: String
  }
}, MyClass, "value")
export default MyClass;
