# Convert JSON to Protocol Buffer definition

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
