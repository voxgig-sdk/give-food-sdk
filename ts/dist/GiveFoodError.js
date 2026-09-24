"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiveFoodError = void 0;
class GiveFoodError extends Error {
    isGiveFoodError = true;
    sdk = 'GiveFood';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.GiveFoodError = GiveFoodError;
//# sourceMappingURL=GiveFoodError.js.map