"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionCreators = void 0;
var api_1 = require("../../api");
var types_1 = require("./types");
exports.actionCreators = {
    resetState: function () { return ({
        type: types_1.PartyActionType.RESET_STATE
    }); },
    requestParty: function (page) { return function (dispatch, getState) {
        if (page === getState().parties.page) {
            return;
        }
        dispatch({
            page: page,
            type: types_1.PartyActionType.REQUEST
        });
        api_1.PartyApi.getPartiesAsync(page)
            .then(function (parties) {
            dispatch({
                parties: parties,
                page: page,
                type: types_1.PartyActionType.RECEIVE
            });
        });
    }; },
};
//# sourceMappingURL=actions.js.map