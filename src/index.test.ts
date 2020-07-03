import { generateProtoDefinition } from '.'

describe('index', () => {
  it.skip('should parse simple JSON to Protocol Buffer', () => {
    const input = `
  {
    "name": "Mo Kweon"
  }`

    expect(generateProtoDefinition(input)).toStrictEqual(`message Root {
  string name = 1;
}`)
  })
})
