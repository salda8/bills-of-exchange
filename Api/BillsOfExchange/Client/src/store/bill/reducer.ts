import { actionCreators } from './actions';
import { FunctionReturnTypes, ReduxAction } from '../';
import { BillActionType, IBillState } from './types';

const initialState: IBillState = {
    bills: [],
    isLoading: false
};

export const reducer = (
    state: IBillState = initialState,
    incomingAction: FunctionReturnTypes<typeof actionCreators>
): IBillState => {
    const action = incomingAction as ReduxAction;

    switch (action.type) {
        case BillActionType.REQUEST:
            const { page } = action;
            return {
                ...state,
                page,
                isLoading: true
            };
        case BillActionType.RECEIVE:
            if (action.page === state.page) {
                const { bills, page } = action;
                return {
                    bills,
                    page,
                    isLoading: false
                };
            }

            return state;
        default:
            return state;
    }
};
