"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastifyHandlerParams = void 0;
var FastifyHandlerParams = /** @class */ (function () {
    function FastifyHandlerParams(_request) {
        this._request = _request;
    }
    Object.defineProperty(FastifyHandlerParams.prototype, "request", {
        get: function () {
            return {
                body: this._request.body,
                params: this._request.params,
            };
        },
        enumerable: false,
        configurable: true
    });
    return FastifyHandlerParams;
}());
exports.FastifyHandlerParams = FastifyHandlerParams;
