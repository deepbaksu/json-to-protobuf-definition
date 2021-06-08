# Convert JSON to Protocol Buffer definition

[![npm version](https://badge.fury.io/js/json-to-protobuf-definition.svg)](https://badge.fury.io/js/json-to-protobuf-definition)
![CI](https://github.com/deepbaksu/json-to-protobuf-definition/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/deepbaksu/json-to-protobuf-definition/branch/master/graph/badge.svg)](https://codecov.io/gh/deepbaksu/json-to-protobuf-definition)
[![dependencies Status](https://david-dm.org/deepbaksu/json-to-protobuf-definition/status.svg)](https://david-dm.org/deepbaksu/json-to-protobuf-definition)
[![devDependencies Status](https://david-dm.org/deepbaksu/json-to-protobuf-definition/dev-status.svg)](https://david-dm.org/deepbaksu/json-to-protobuf-definition?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/bd45726de715de7afa32/maintainability)](https://codeclimate.com/github/deepbaksu/json-to-protobuf-definition/maintainability)

```json
{
  "name": "Mo Kweon",
  "some_property": 1234
}
```

to

```proto
message Root {
  string name = 1;
  int64 some_property = 2;
}
```

## Install

```shell
npm install -D json-to-protobuf-definition
yarn add -D json-to-protobuf-definition
```

## How to use

```ts
import {
  convertProtoMessageToString,
  parseRootObjectToProtoMessage,
} from "json-to-protobuf-definition";

// obtained from JSON.parse('{"name": "Mark Hahn""}')
const input = {
  name: "Mark Hahn",
};

const message = parseRootObjectToProtoMessage(input);
console.log(convertProtoMessageToString(message));
// message Root {
//   string name = 1;
// }
```

## How to develop

```
yarn # install dependencies
yarn test # run test
yarn lint # run lint or `yarn lint --fix` to fix the lint issues
```
