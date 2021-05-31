"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInt = void 0;
// If there is no remainder when x % 1, it's an integer.
function isInt(x) {
    return x % 1 === 0;
}
exports.isInt = isInt;
//# sourceMappingURL=number_utils.js.map