"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseProtoField = void 0;
var models_pb_1 = require("./models/models_pb");
var pascalcase_1 = __importDefault(require("pascalcase"));
var create_empty_proto_type_1 = require("./create_empty_proto_type");
var number_utils_1 = require("./number_utils");
var lodash_snakecase_1 = __importDefault(require("lodash.snakecase"));
function parseProtoField(obj, fieldName, fieldTag) {
    var protoField = new models_pb_1.ProtoField();
    protoField.setName(lodash_snakecase_1.default(fieldName));
    protoField.setTag(fieldTag);
    switch (typeof obj) {
        case 'string': {
            var protoType = new models_pb_1.ProtoType();
            protoType.setProtoTypePrimitive(models_pb_1.ProtoPrimitive.PROTO_PRIMITIVE_STRING);
            protoField.setType(protoType);
            break;
        }
        case 'boolean': {
            var protoType = new models_pb_1.ProtoType();
            protoType.setProtoTypePrimitive(models_pb_1.ProtoPrimitive.PROTO_PRIMITIVE_BOOL);
            protoField.setType(protoType);
            break;
        }
        case 'number': {
            var protoType = new models_pb_1.ProtoType();
            protoType.setProtoTypePrimitive(number_utils_1.isInt(obj)
                ? models_pb_1.ProtoPrimitive.PROTO_PRIMITIVE_INT64
                : models_pb_1.ProtoPrimitive.PROTO_PRIMITIVE_DOUBLE);
            protoField.setType(protoType);
            break;
        }
        case 'object': {
            // There are 3 possible cases: null, array, object
            // null and object are treated the same (creating an message).
            // array will be repeated message
            if (obj === null) {
                protoField.setType(create_empty_proto_type_1.createEmptyProtoType(fieldName));
            }
            else if (Array.isArray(obj)) {
                if (obj.length === 0) {
                    protoField.setType(create_empty_proto_type_1.createEmptyProtoType(fieldName));
                    protoField.setRepeated(true);
                }
                else {
                    // use the first element to infer the type
                    // TODO(kkweon): Merge messages when multiple different type appears in the array.
                    var elementProtoField = parseProtoField(obj[0], fieldName, fieldTag);
                    elementProtoField.setRepeated(true);
                    // it can safely return here because the type of the array element
                    // gets lifted.
                    //
                    // For example, { name: ["mo", "mark"] }
                    // it should become `repeated string name = 1`
                    // because the type of "mo" is string.
                    return elementProtoField;
                }
            }
            else {
                var protoMessage = new models_pb_1.ProtoMessage();
                protoMessage.setName(pascalcase_1.default(fieldName));
                var tag = 1;
                for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], msg = _b[1];
                    protoMessage.addFields(parseProtoField(msg, key, tag++));
                }
                var protoType = new models_pb_1.ProtoType();
                protoType.setProtoTypeMessage(protoMessage);
                protoField.setType(protoType);
            }
        }
    }
    return protoField;
}
exports.parseProtoField = parseProtoField;
//# sourceMappingURL=parse_proto_field.js.map