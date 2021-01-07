import { actionCreators } from './actions';
import { FunctionReturnTypes, ReduxAction } from '../';
import { IBillDetailState, BillDetailActionType } from './types';

const initialState: IBillDetailState = {
    billDetail: null,
    id: 0
};

export const reducer = (
    state: IBillDetailState = initialState,
    incomingAction: FunctionReturnTypes<typeof actionCreators>
): IBillDetailState => {
    const action = incomingAction as ReduxAction;

    switch (action.type) {
        case BillDetailActionType.REQUEST:
            const { id } = action;
            return {
                ...state,
                id
            };
        case BillDetailActionType.RECEIVE:
            if (action.id === state.id) {
                const { billDetail, id } = action;
                return {
                    billDetail,
                    id
                };
            }

            return state;
        default:
            return state;
    }
};
