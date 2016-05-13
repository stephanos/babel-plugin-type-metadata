# babel-plugin-type-metadata [![Build Status](https://travis-ci.org/stephanos/babel-plugin-type-metadata.svg)](https://travis-ci.org/stephanos/babel-plugin-type-metadata) [![Coverage Status](https://coveralls.io/repos/stephanos/babel-plugin-type-metadata/badge.svg?branch=master&service=github)](https://coveralls.io/github/stephanos/babel-plugin-type-metadata?branch=master)


This plugin generates code to identify
[Flow](http://flowtype.org/)
types at runtime via
[metadata](https://github.com/rbuckton/ReflectDecorators).


## Usage

If you run the plugin on the following input

```js
/* @flow */

class MyClass {
  stringMethod(): string {
    return 'string';
  }
}
```

it will create add the following metadata:

```js
Reflect.defineMetadata('typeof', {
  kind: 'method',
  returns: {
    type: String
  },
  parameters: []
}, MyClass, 'stringMethod');
```


## Get Started

Install the plugin:

```
npm install babel-plugin-type-metadata --save-dev
```

And add the additional step to your `.babelrc`:

```js
{
  "plugins": [
    "babel-plugin-syntax-flow",
    "babel-plugin-type-metadata"
  ]
}
```
