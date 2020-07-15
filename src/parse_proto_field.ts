import {
  ProtoField,
  ProtoMessage,
  ProtoPrimitive,
  ProtoType,
} from './models/models_pb'
import pascalcase from 'pascalcase'
import { createEmptyProtoType } from './create_empty_proto_type'
import { isInt } from './number_utils'
import snakeCase from 'lodash.snakecase'

export function parseProtoField(
  obj: unknown,
  fieldName: string,
  fieldTag: number,
): ProtoField {
  const protoField = new ProtoField()
  protoField.setName(snakeCase(fieldName))
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
      // There are 3 possible cases: null, array, object
      // null and object are treated the same (creating an message).
      // array will be repeated message
      if (obj === null) {
        protoField.setType(createEmptyProtoType(fieldName))
      } else if (Array.isArray(obj)) {
        if (obj.length === 0) {
          protoField.setType(createEmptyProtoType(fieldName))
          protoField.setRepeated(true)
        } else {
          // use the first element to infer the type
          // TODO(kkweon): Merge messages when multiple different type appears in the array.
          const elementProtoField = parseProtoField(obj[0], fieldName, fieldTag)
          elementProtoField.setRepeated(true)

          // it can safely return here because the type of the array element
          // gets lifted.
          //
          // For example, { name: ["mo", "mark"] }
          // it should become `repeated string name = 1`
          // because the type of "mo" is string.
          return elementProtoField
        }
      } else {
        const protoMessage = new ProtoMessage()
        protoMessage.setName(pascalcase(fieldName))

        let tag = 1

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
