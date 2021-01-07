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
    parties: [],
    isLoading: false
};
var reducer = function (state, incomingAction) {
    if (state === void 0) { state = initialState; }
    var action = incomingAction;
    switch (action.type) {
        case types_1.PartyActionType.REQUEST:
            var page = action.page;
            return __assign(__assign({}, state), { page: page, isLoading: true });
        case types_1.PartyActionType.RECEIVE:
            if (action.page === state.page) {
                var parties = action.parties, page_1 = action.page;
                return {
                    parties: parties,
                    page: page_1,
                    isLoading: false
                };
            }
            return state;
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map