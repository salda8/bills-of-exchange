"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionCreators = void 0;
var api_1 = require("../../api");
var types_1 = require("./types");
exports.actionCreators = {
    resetState: function () { return ({
        type: types_1.BillActionType.RESET_STATE
    }); },
    requestBill: function (page) { return function (dispatch, getState) {
        if (page === getState().bills.page) {
            return;
        }
        dispatch({
            page: page,
            type: types_1.BillActionType.REQUEST
        });
        api_1.BillApi.getBillsAsync(page)
            .then(function (bills) {
            dispatch({
                bills: bills,
                page: page,
                type: types_1.BillActionType.RECEIVE
            });
        });
    }; },
};
//# sourceMappingURL=actions.js.map