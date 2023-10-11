"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentPresenter = void 0;
var ParentPresenter = /** @class */ (function () {
    function ParentPresenter() {
    }
    ParentPresenter.prototype.present = function (aParent) {
        return {
            id: aParent.id.toString(),
            name: aParent.name,
            lastName: aParent.lastName,
            phones: aParent.phones.map(String),
            emails: aParent.emails.map(String),
            address: aParent.address.map(String),
            cpf: aParent.cpf.toString(),
        };
    };
    return ParentPresenter;
}());
exports.ParentPresenter = ParentPresenter;
