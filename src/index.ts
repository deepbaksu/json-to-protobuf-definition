import {
  ProtoMessage,


} from './models/models_pb'
import { parseProtoField } from './parse_proto_field'

export function parseRootObjectToProtoMessage(
  obj: object,
  name = 'root',
): ProtoMessage {
  const root = new ProtoMessage()

  root.setName(name)

  Object.keys(obj).forEach((key, idx) => {
    root.addFields(parseProtoField((obj as any)[key], key, idx + 1))
  })

  return root
}
