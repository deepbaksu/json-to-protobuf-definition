import snakeCase from 'lodash.snakecase'

export function normalizeProtoFieldName(fieldName: string): string {
  return snakeCase(fieldName)
}

