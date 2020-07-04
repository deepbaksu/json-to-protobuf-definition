import { ProtoField, ProtoPrimitive, ProtoType } from './models/models_pb'
import { normalizeProtoFieldName } from './field_name_normalize'

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
  }

  return protoField
}
