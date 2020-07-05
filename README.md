# Convert JSON to Protocol Buffer definition

![CI](https://github.com/dl4ab/json-to-protobuf-definition/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/dl4ab/json-to-protobuf-definition/branch/master/graph/badge.svg)](https://codecov.io/gh/dl4ab/json-to-protobuf-definition)
[![dependencies Status](https://david-dm.org/dl4ab/json-to-protobuf-definition/status.svg)](https://david-dm.org/dl4ab/json-to-protobuf-definition)
[![devDependencies Status](https://david-dm.org/dl4ab/json-to-protobuf-definition/dev-status.svg)](https://david-dm.org/dl4ab/json-to-protobuf-definition?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/bd45726de715de7afa32/maintainability)](https://codeclimate.com/github/dl4ab/json-to-protobuf-definition/maintainability)

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
