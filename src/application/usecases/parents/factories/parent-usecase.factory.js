"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentUseCaseFactory = void 0;
var create_parent_usecase_1 = require("../create-parent.usecase");
var delete_parent_usecase_1 = require("../delete-parent.usecase");
var update_parent_usecase_1 = require("../update-parent.usecase");
var get_parent_usecase_1 = require("../get-parent.usecase");
var fetch_parents_usecase_1 = require("../fetch-parents.usecase");
var ParentUseCaseFactory = /** @class */ (function () {
    function ParentUseCaseFactory(parentsRepository, parentPresenter) {
        this.parentsRepository = parentsRepository;
        this.parentPresenter = parentPresenter;
    }
    ParentUseCaseFactory.prototype.createCreateParentUseCase = function () {
        return new create_parent_usecase_1.CreateParentUseCase(this.parentsRepository, this.parentPresenter);
    };
    ParentUseCaseFactory.prototype.createDeleteParentUseCase = function () {
        return new delete_parent_usecase_1.DeleteParentUseCase(this.parentsRepository);
    };
    ParentUseCaseFactory.prototype.createFetchParentsUseCase = function () {
        return new fetch_parents_usecase_1.FetchParentsUseCase(this.parentsRepository);
    };
    ParentUseCaseFactory.prototype.createGetParentUseCase = function () {
        return new get_parent_usecase_1.GetParentUseCase(this.parentsRepository);
    };
    ParentUseCaseFactory.prototype.createUpdateParentUseCase = function () {
        return new update_parent_usecase_1.UpdateParentUseCase(this.parentsRepository);
    };
    return ParentUseCaseFactory;
}());
exports.ParentUseCaseFactory = ParentUseCaseFactory;
