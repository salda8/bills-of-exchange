"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionCreators = void 0;
var api_1 = require("../../api");
var types_1 = require("./types");
exports.actionCreators = {
    resetState: function () { return ({
        type: types_1.BillDetailActionType.RESET_STATE
    }); },
    requestBillDetail: function (id) { return function (dispatch, getState) {
        if (id === getState().billDetail.id) {
            return;
        }
        dispatch({
            id: id,
            type: types_1.BillDetailActionType.REQUEST
        });
        api_1.BillApi.getBillDetailAsync(id)
            .then(function (billDetail) {
            dispatch({
                billDetail: billDetail,
                id: id,
                type: types_1.BillDetailActionType.RECEIVE
            });
        });
    }; },
};
//# sourceMappingURL=actions.js.map