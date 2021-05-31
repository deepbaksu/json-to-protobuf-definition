"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeProtoFieldName = void 0;
var lodash_snakecase_1 = __importDefault(require("lodash.snakecase"));
function normalizeProtoFieldName(fieldName) {
    return lodash_snakecase_1.default(fieldName);
}
exports.normalizeProtoFieldName = normalizeProtoFieldName;
//# sourceMappingURL=field_name_normalize.js.map