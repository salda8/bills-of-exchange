import createRootReducer from './rootReducer';
import { configureStore } from './configureStore';
import { RouterState } from 'connected-react-router';
import { reducer as PartyReducer } from './party';
import { reducer as BillReducer } from './bill';
import { reducer as BillDetailReducer } from './billdetail';

export interface IApplicationState {
  readonly router: RouterState;
    readonly parties: ReturnType<typeof PartyReducer>;
    readonly bills: ReturnType<typeof BillReducer>;
    readonly billDetail: ReturnType<typeof BillDetailReducer>;
}

export type ReduxAction = { type: string; } & { [key: string]: any; };

export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}

export type FunctionReturnTypes<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<T[K]> : never }[keyof T];

export {
  configureStore,
  createRootReducer
};