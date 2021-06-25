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
    expect.hasAssertions()
    expect(convertProtoMessageToString(getSimpleProtoMessage())).toStrictEqual(`
message Root {
  string field_name = 1;
}`)
  })

  it('should convert multiple primitive fields to string', () => {
    expect.hasAssertions()
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

  it('should convert nested objects', () => {
    expect.hasAssertions()
    const input = {
      code: 100,
      msg: 'success',
      result: {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NSJ9.slBCWsGnvLyUCVIjaLHlS67rNqyWAd1f9BB6D1oc7d0',
      },
    }

    expect(convertProtoMessageToString(parseRootObjectToProtoMessage(input)))
      .toStrictEqual(`
message Root {
  int64 code = 1;
  string msg = 2;

  message Result {
    string token = 1;
  }
  Result result = 3;
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
