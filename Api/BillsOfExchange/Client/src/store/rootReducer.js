"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var connected_react_router_1 = require("connected-react-router");
var party_1 = require("./party");
var bill_1 = require("./bill");
var billdetail_1 = require("./billdetail");
var rootReducer = function (history) {
    return redux_1.combineReducers({
        router: connected_react_router_1.connectRouter(history),
        parties: party_1.reducer,
        bills: bill_1.reducer,
        billDetail: billdetail_1.reducer,
    });
};
exports.default = rootReducer;
//# sourceMappingURL=rootReducer.js.map