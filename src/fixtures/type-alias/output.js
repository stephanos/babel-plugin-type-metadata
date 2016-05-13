type MyType = string | number;
Reflect.defineMetadata("typeof", {
  kind: "alias",
  definition: {
    kind: "union",
    types: [{
      type: String
    }, {
      type: Number
    }]
  }
}, module, "MyType")
