import { parseRootObjectToProtoMessage, convertProtoMessageToString } from '.'
import {
  ProtoMessage,
  ProtoField,
  ProtoType,
  ProtoPrimitive,
  ProtoPrimitiveMap,
} from './models/models_pb'

describe('index', () => {
  it('should convert the basic object to ProtoMessage', () => {
    expect.hasAssertions()

    const obj = {
      fieldName: 'mo kweon',
    }

    expect(parseRootObjectToProtoMessage(obj)).toStrictEqual(
      getSimpleProtoMessage(),
    )
  })

  it('should convert the ProtoMessage to string', () => {
    expect(convertProtoMessageToString(getSimpleProtoMessage())).toStrictEqual(`
message Root {
  string field_name = 1;
}`)
  })

  it('should convert multiple primitive fields to string', () => {
    const protoMessage = getSimpleProtoMessage()
    protoMessage.addFields(
      getPrimitiveProtoField(
        ProtoPrimitive.PROTO_PRIMITIVE_BOOL,
        'bool_name',
        /*fieldTag=*/ 2,
      ),
    )
    protoMessage.addFields(
      getPrimitiveProtoField(
        ProtoPrimitive.PROTO_PRIMITIVE_INT64,
        'int64_name',
        /*fieldTag=*/ 3,
      ),
    )
    protoMessage.addFields(
      getPrimitiveProtoField(
        ProtoPrimitive.PROTO_PRIMITIVE_DOUBLE,
        'double_name',
        /*fieldTag=*/ 4,
      ),
    )

    expect(convertProtoMessageToString(protoMessage)).toStrictEqual(`
message Root {
  string field_name = 1;
  bool bool_name = 2;
  int64 int64_name = 3;
  double double_name = 4;
}`)
  })
})

/**
 * Returns ProtoMessage representing the following Proto definition.
 *
 * message Root {
 *   string field_name = 1;
 * }
 */
function getSimpleProtoMessage(): ProtoMessage {
  const expected = new ProtoMessage()
  expected.setName('Root')

  expected.addFields(
    getPrimitiveProtoField(
      ProtoPrimitive.PROTO_PRIMITIVE_STRING,
      'field_name',
      /*fieldTag=*/ 1,
    ),
  )

  return expected
}

function getPrimitiveProtoField(
  primitiveType: ProtoPrimitiveMap[keyof ProtoPrimitiveMap],
  fieldName: string,
  fieldTag: number,
): ProtoField {
  const protoField = new ProtoField()
  protoField.setName(fieldName)
  protoField.setTag(fieldTag)

  const protoType = new ProtoType()
  protoType.setProtoTypePrimitive(primitiveType)

  protoField.setType(protoType)

  return protoField
}
