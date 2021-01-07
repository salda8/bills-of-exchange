"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = void 0;
var types_1 = require("./types");
var initialState = {
    billDetail: null,
    id: 0
};
var reducer = function (state, incomingAction) {
    if (state === void 0) { state = initialState; }
    var action = incomingAction;
    switch (action.type) {
        case types_1.BillDetailActionType.REQUEST:
            var id = action.id;
            return __assign(__assign({}, state), { id: id });
        case types_1.BillDetailActionType.RECEIVE:
            if (action.id === state.id) {
                var billDetail = action.billDetail, id_1 = action.id;
                return {
                    billDetail: billDetail,
                    id: id_1
                };
            }
            return state;
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map