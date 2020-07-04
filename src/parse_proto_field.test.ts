import {
  ProtoField,
  ProtoPrimitive,
  ProtoPrimitiveMap,
  ProtoType,
} from './models/models_pb'
import { parseProtoField } from './parse_proto_field'

const keyName: string = 'key_name'
const tagNumber: number = 1

describe('parse_proto_field', () => {
  it('should convert string to ProtoField', () => {
    expect.hasAssertions()

    expect(parseProtoField('mo kweon', keyName, tagNumber)).toStrictEqual(
      buildPrimitiveProtoField(
        keyName,
        tagNumber,
        ProtoPrimitive.PROTO_PRIMITIVE_STRING,
      ),
    )
  })

  it('should convert bool to ProtoField', () => {
    expect.hasAssertions()

    expect(parseProtoField(true, keyName, tagNumber)).toStrictEqual(
      buildPrimitiveProtoField(
        keyName,
        tagNumber,
        ProtoPrimitive.PROTO_PRIMITIVE_BOOL,
      ),
    )

    expect(parseProtoField(false, keyName, tagNumber)).toStrictEqual(
      buildPrimitiveProtoField(
        keyName,
        tagNumber,
        ProtoPrimitive.PROTO_PRIMITIVE_BOOL,
      ),
    )
  })

  it('should convert int64 to ProtoField', () => {
    expect.hasAssertions()

    expect(parseProtoField(1, keyName, tagNumber)).toStrictEqual(
      buildPrimitiveProtoField(
        keyName,
        tagNumber,
        ProtoPrimitive.PROTO_PRIMITIVE_INT64,
      ),
    )

    expect(parseProtoField(-1, keyName, tagNumber)).toStrictEqual(
      buildPrimitiveProtoField(
        keyName,
        tagNumber,
        ProtoPrimitive.PROTO_PRIMITIVE_INT64,
      ),
    )
  })

  it('should convert double to ProtoField', () => {
    expect.hasAssertions()

    expect(parseProtoField(1.1, keyName, tagNumber)).toStrictEqual(
      buildPrimitiveProtoField(
        keyName,
        tagNumber,
        ProtoPrimitive.PROTO_PRIMITIVE_DOUBLE,
      ),
    )
  })

  function buildPrimitiveProtoField(
    keyName: string,
    tagNumber: number,
    protoPrimitiveType: ProtoPrimitiveMap[keyof ProtoPrimitiveMap],
  ): ProtoField {
    const protoField = new ProtoField()
    protoField.setName(keyName)
    protoField.setTag(tagNumber)

    const protoType = new ProtoType()
    protoType.setProtoTypePrimitive(protoPrimitiveType)
    protoField.setType(protoType)

    return protoField
  }
})
