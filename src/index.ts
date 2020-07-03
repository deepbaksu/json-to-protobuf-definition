export function generateProtoDefinition(json: string): string {
  const parsedObject = JSON.parse(json)

  let i = 1

  const messages = [
    'message Root {',

    ...Object.keys(parsedObject).map((key) => `any ${key} = ${i++}`),

    '}',
  ]

  return messages.join('\n')
}
