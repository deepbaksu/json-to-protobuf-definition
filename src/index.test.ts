import { parseRootObjectToProtoMessage } from '.'
import {
  ProtoMessage,
  ProtoField,
  ProtoType,
  ProtoPrimitive,
} from './models/models_pb'

describe('index', () => {
  it('should convert the basic object to ProtoMessage', () => {
    expect.hasAssertions()

    const obj = {
      keyName: 'mo kweon',
    }

    // The expected proto
    //
    // message Root {
    //   string keyName = 1;
    // }
    const expected = new ProtoMessage()
    expected.setName('root')

    const protoField = new ProtoField()
    protoField.setName('key_name')
    protoField.setTag(1)

    const protoType = new ProtoType()
    protoType.setProtoTypePrimitive(ProtoPrimitive.PROTO_PRIMITIVE_STRING)
    protoField.setType(protoType)
    expected.addFields(protoField)

    expect(parseRootObjectToProtoMessage(obj)).toStrictEqual(expected)
  })
})
