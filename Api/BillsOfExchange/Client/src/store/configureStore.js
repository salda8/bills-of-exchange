"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureStore = void 0;
var redux_thunk_1 = require("redux-thunk");
var rootReducer_1 = require("./rootReducer");
var connected_react_router_1 = require("connected-react-router");
var redux_1 = require("redux");
var configureStore = function (history, initialState) {
    var _a;
    var composeEnhancer = ((_a = window) === null || _a === void 0 ? void 0 : _a.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        redux_1.compose;
    var store = redux_1.createStore(rootReducer_1.default(history), initialState, composeEnhancer(redux_1.applyMiddleware(redux_thunk_1.default, connected_react_router_1.routerMiddleware(history))));
    return store;
};
exports.configureStore = configureStore;
//# sourceMappingURL=configureStore.js.map