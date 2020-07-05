import { ProtoMessage, ProtoType } from './models/models_pb'
import pascalcase from 'pascalcase'

/**
 * Create an empty message and wraps it with ProtoType.
 *
 * For example, it would simply create the following
 *
 * message MessageName {
 *
 * }
 *
 * @param messageName the name of the message
 */
export function createEmptyProtoType(messageName: string): ProtoType {
  const protoType = new ProtoType()
  const protoMessage = new ProtoMessage()
  protoMessage.setName(pascalcase(messageName))
  protoType.setProtoTypeMessage(protoMessage)
  return protoType
}
