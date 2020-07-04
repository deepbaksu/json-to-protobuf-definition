import {
  ProtoField,
  ProtoMessage,
  ProtoPrimitive,
  ProtoType,
} from './models/models_pb'
import { normalizeProtoFieldName } from './field_name_normalize'
import pascalcase from 'pascalcase'

// If there is no remainder when x % 1, it's an integer.
function isInt(x: number): boolean {
  return x % 1 === 0
}

export function parseProtoField(
  obj: unknown,
  fieldName: string,
  fieldTag: number,
): ProtoField {
  const protoField = new ProtoField()
  protoField.setName(normalizeProtoFieldName(fieldName))
  protoField.setTag(fieldTag)

  switch (typeof obj) {
    case 'string': {
      const protoType = new ProtoType()
      protoType.setProtoTypePrimitive(ProtoPrimitive.PROTO_PRIMITIVE_STRING)
      protoField.setType(protoType)
      break
    }

    case 'boolean': {
      const protoType = new ProtoType()
      protoType.setProtoTypePrimitive(ProtoPrimitive.PROTO_PRIMITIVE_BOOL)
      protoField.setType(protoType)
      break
    }

    case 'number': {
      const protoType = new ProtoType()
      protoType.setProtoTypePrimitive(
        isInt(obj)
          ? ProtoPrimitive.PROTO_PRIMITIVE_INT64
          : ProtoPrimitive.PROTO_PRIMITIVE_DOUBLE,
      )
      protoField.setType(protoType)
      break
    }

    case 'object': {
      // There are 3 possible case: null, array, object
      // null and object are treated the same (creating an message).
      // array will be repeated message

      if (obj === null) {
        const protoType = new ProtoType()
        const protoMessage = new ProtoMessage()
        protoMessage.setName(pascalcase(fieldName))
        protoType.setProtoTypeMessage(protoMessage)

        protoField.setType(protoType)
        break
      } else if (Array.isArray(obj)) {
        // TODO(kkweon): Handle array
      } else {
        const protoMessage = new ProtoMessage()
        protoMessage.setName(pascalcase(fieldName))

        let tag = 1
        // object
        for (const [key, msg] of Object.entries(obj)) {
          protoMessage.addFields(parseProtoField(msg, key, tag++))
        }

        const protoType = new ProtoType()
        protoType.setProtoTypeMessage(protoMessage)

        protoField.setType(protoType)
      }
    }
  }

  return protoField
}
