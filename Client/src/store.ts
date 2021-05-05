import { createDriver } from "@redux-requests/axios";
import { handleRequests } from "@redux-requests/core";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { http, onError } from "./api/api";

export const configureStore = () => {
  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver(http),
    onError,
  });

  const reducers = combineReducers({
    requests: requestsReducer,
  });

  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...requestsMiddleware))
  );
};
