"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmptyProtoType = void 0;
var models_pb_1 = require("./models/models_pb");
var pascalcase_1 = __importDefault(require("pascalcase"));
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
function createEmptyProtoType(messageName) {
    var protoType = new models_pb_1.ProtoType();
    var protoMessage = new models_pb_1.ProtoMessage();
    protoMessage.setName(pascalcase_1.default(messageName));
    protoType.setProtoTypeMessage(protoMessage);
    return protoType;
}
exports.createEmptyProtoType = createEmptyProtoType;
//# sourceMappingURL=create_empty_proto_type.js.map