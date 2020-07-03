it("should parse simple JSON to Protocol Buffer", () => {
  const input = `
  {
    "name": "Mo Kweon",
  }`;

  expect(generateProtoDefinition(input)).toEqual(`message Root {
  string name = 1;
}`);
});
