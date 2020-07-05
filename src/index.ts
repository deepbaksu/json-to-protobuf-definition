import generateSchema from 'generate-schema'
import convert from 'jsonschema-protobuf'

const obj = {
  name: 'Mo Kweon',
}
const schema = generateSchema.json('Product', obj)
const jsonSchema = JSON.stringify(schema, undefined, 4)
console.log(jsonSchema)
const protobufDefinition = convert(jsonSchema)
console.log(protobufDefinition)
