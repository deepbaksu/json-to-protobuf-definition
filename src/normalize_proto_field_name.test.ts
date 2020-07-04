import { normalizeProtoFieldName } from './normalize_proto_field_name'

it('should convert camelCase to snake_case', () => {
  expect(normalizeProtoFieldName('camelCase')).toBe('camel_case')
})

it('should remove any special chars to snake_case', () => {
  expect(normalizeProtoFieldName('@@@camelCase@@@')).toBe('camel_case')
})
