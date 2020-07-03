import { parseRootObjectToProtoMessage } from '.'
import {
  ProtoMessage,
  ProtoField,
  ProtoType,
  ProtoPrimitive,
} from './models/models_pb'

it('should convert the basic object to ProtoMessage', () => {
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

  expect(parseRootObjectToProtoMessage(obj)).toEqual(expected)
})
