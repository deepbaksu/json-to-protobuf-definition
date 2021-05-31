import { ProtoMessage } from './models/models_pb';
export declare function parseRootObjectToProtoMessage(obj: object, name?: string): ProtoMessage;
/**
 * Converts ProtoMessage to Proto definition
 *
 * For example, the following is the example output.
 *
 * message Root {
 *   string key_name = 1;
 * }
 */
export declare function convertProtoMessageToString(protoMessage: ProtoMessage): string;
//# sourceMappingURL=index.d.ts.map