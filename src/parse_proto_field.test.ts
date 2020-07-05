import {
  ProtoField,
  ProtoMessage,
  ProtoPrimitive,
  ProtoPrimitiveMap,
  ProtoType,
} from './models/models_pb'
import { parseProtoField } from './parse_proto_field'
import pascalcase from 'pascalcase'

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

  it('should convert null to ProtoField', () => {
    expect.hasAssertions()

    const protoField = new ProtoField()
    protoField.setName(keyName)
    protoField.setTag(tagNumber)

    // it should have an empty proto message
    const protoType = new ProtoType()

    const protoMessage = new ProtoMessage()
    protoMessage.setName(pascalcase(keyName))
    protoType.setProtoTypeMessage(protoMessage)
    protoField.setType(protoType)

    expect(parseProtoField(null, keyName, tagNumber)).toStrictEqual(protoField)
  })

  it('should convert nested object to ProtoField', () => {
    expect.hasAssertions()

    // this should be translated into
    // KeyName key_name = tagNumber
    //
    // message KeyName {
    //   Person person = 1
    // }
    //
    // message Person {
    //   int64 id = 1;
    //   string name = 2;
    // }
    const inputObject = {
      person: {
        id: 1,
        name: 'Mo',
      },
    }

    const idField = buildPrimitiveProtoField(
      /*fieldName=*/ 'id',
      /*tagNumber=*/ 1,
      ProtoPrimitive.PROTO_PRIMITIVE_INT64,
    )
    const nameField = buildPrimitiveProtoField(
      /*fieldName=*/ 'name',
      /*tagNumber=*/ 2,
      ProtoPrimitive.PROTO_PRIMITIVE_STRING,
    )

    const personProtoMessage = new ProtoMessage()
    personProtoMessage.setName('Person')
    personProtoMessage.setFieldsList([idField, nameField])

    const personProtoType = new ProtoType()
    personProtoType.setProtoTypeMessage(personProtoMessage)

    const personField = new ProtoField()
    personField.setType(personProtoType)
    personField.setTag(1)
    personField.setName('person')

    const keyNameMessage = new ProtoMessage()
    keyNameMessage.setName('KeyName')
    keyNameMessage.addFields(personField)

    const keyNameProtoType = new ProtoType()
    keyNameProtoType.setProtoTypeMessage(keyNameMessage)

    const keyNameField = new ProtoField()
    keyNameField.setName(keyName)
    keyNameField.setTag(tagNumber)
    keyNameField.setType(keyNameProtoType)

    expect(parseProtoField(inputObject, keyName, tagNumber)).toStrictEqual(
      keyNameField,
    )
  })

  it('should convert a simple object to ProtoField', () => {
    expect.hasAssertions()
    // This is equivalent to
    //
    // KeyName key_name = tagNumber;
    //
    // message KeyName {
    //   string name = 1;
    // }
    const input = {
      name: 'Mo Kweon',
    }

    const nameField = buildPrimitiveProtoField(
      'name',
      1,
      ProtoPrimitive.PROTO_PRIMITIVE_STRING,
    )

    const keyNameMessage = new ProtoMessage()
    keyNameMessage.setName('KeyName')
    keyNameMessage.addFields(nameField)

    const keyNameProtoType = new ProtoType()
    keyNameProtoType.setProtoTypeMessage(keyNameMessage)

    const keyNameField = new ProtoField()
    keyNameField.setType(keyNameProtoType)
    keyNameField.setName(keyName)
    keyNameField.setTag(tagNumber)

    expect(parseProtoField(input, keyName, tagNumber)).toStrictEqual(
      keyNameField,
    )
  })

  it('should convert array into repeated field using the first element', () => {
    expect.hasAssertions()
    const input = ['mo kweon', 'mark hahn']

    // Expected field
    //
    // repeated string key_name = tagNumber
    const protoField = buildPrimitiveProtoField(
      keyName,
      tagNumber,
      ProtoPrimitive.PROTO_PRIMITIVE_STRING,
    )
    protoField.setRepeated(true)

    expect(parseProtoField(input, keyName, tagNumber)).toStrictEqual(protoField)
  })

  it('should treat the empty array as null', () => {
    expect.hasAssertions()
    const input: any[] = []

    // Expected field
    //
    // repeated KeyName key_name = tagNumber
    //
    // message KeyName { }

    const keyNameMessage = new ProtoMessage()
    keyNameMessage.setName(pascalcase(keyName))
    const keyNameMessageProtoType = new ProtoType()
    keyNameMessageProtoType.setProtoTypeMessage(keyNameMessage)

    const protoField = new ProtoField()
    protoField.setName(keyName)
    protoField.setTag(tagNumber)
    protoField.setRepeated(true)
    protoField.setType(keyNameMessageProtoType)

    expect(parseProtoField(input, keyName, tagNumber)).toStrictEqual(protoField)
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
