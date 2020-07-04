import snakeCase from 'lodash.snakecase'

/**
 * Normalize the field name as it should be snake_case for proto.
 *
 * message Root {
 *   FieldType field_name = 1;
 * }
 *
 * @param fieldName name to be snake cased
 * @return snake cased name
 */
export function normalizeProtoFieldName(fieldName: string): string {
  return snakeCase(fieldName)
}
