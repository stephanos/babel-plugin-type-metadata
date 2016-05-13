type MyType = string;
Reflect.defineMetadata("typeof", {
  kind: "alias",
  type: String
}, module, "MyType")
