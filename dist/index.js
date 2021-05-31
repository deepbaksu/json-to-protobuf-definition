"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertProtoMessageToString = exports.parseRootObjectToProtoMessage = void 0;
var models_pb_1 = require("./models/models_pb");
var parse_proto_field_1 = require("./parse_proto_field");
function parseRootObjectToProtoMessage(obj, name) {
    if (name === void 0) { name = 'Root'; }
    var root = new models_pb_1.ProtoMessage();
    root.setName(name);
    Object.keys(obj).forEach(function (key, idx) {
        root.addFields(parse_proto_field_1.parseProtoField(obj[key], key, idx + 1));
    });
    return root;
}
exports.parseRootObjectToProtoMessage = parseRootObjectToProtoMessage;
/**
 * Converts ProtoMessage to Proto definition
 *
 * For example, the following is the example output.
 *
 * message Root {
 *   string key_name = 1;
 * }
 */
function convertProtoMessageToString(protoMessage) {
    return "\nmessage " + protoMessage.getName() + " {\n" + convertProtoFields(protoMessage.getFieldsList(), /*depth=*/ 1) + "\n}";
}
exports.convertProtoMessageToString = convertProtoMessageToString;
/**
 * Converts ProtoField[] to string
 *
 * @param protoFields ProtoField[]
 * @param depth The depth of 1 means the fields of the root object. Hence, it
 * needs to be indented with 2 spaces. For example,
 *
 * message Root {
 *   string key_name = 1; // notice there are 2 spaces in this line.
 * }
 *
 * @returns string
 */
function convertProtoFields(protoFields, depth) {
    var prefix = '  '.repeat(depth);
    return protoFields
        .map(function (protoField) { return prefix + convertProtoField(protoField); })
        .join('\n');
}
/**
 * Converts a single ProtoField into string
 *
 * Currently, it only supports primitive types.
 *
 * TODO: Support embedded types.
 */
function convertProtoField(protoField) {
    var _a;
    if ((_a = protoField.getType()) === null || _a === void 0 ? void 0 : _a.hasProtoTypePrimitive()) {
        var prefix = protoField.getRepeated() ? 'repeated ' : '';
        var protoFieldType = getProtoTypePrimitiveName(protoField.getType().getProtoTypePrimitive());
        return "" + prefix + protoFieldType + " " + protoField.getName() + " = " + protoField.getTag() + ";";
    }
    // protoField.getType()?.hasProtoTypeMessage()
    throw new TypeError('ProtoTypeMessage is currently not supported for conversion');
}
function getProtoTypePrimitiveName(protoTypePrimitive) {
    switch (protoTypePrimitive) {
        case models_pb_1.ProtoPrimitive.PROTO_PRIMITIVE_STRING:
            return 'string';
        case models_pb_1.ProtoPrimitive.PROTO_PRIMITIVE_BOOL:
            return 'bool';
        case models_pb_1.ProtoPrimitive.PROTO_PRIMITIVE_INT64:
            return 'int64';
        case models_pb_1.ProtoPrimitive.PROTO_PRIMITIVE_DOUBLE:
            return 'double';
        case models_pb_1.ProtoPrimitive.PROTO_PRIMITIVE_UNKNOWN:
            return 'unknown';
    }
}
//# sourceMappingURL=index.js.map