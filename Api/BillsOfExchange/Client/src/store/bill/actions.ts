import { BillApi } from '../../api';
import { IAppThunkAction, ReduxAction } from '../';
import { BillActionType, IBill } from './types';

export const actionCreators = {
    resetState: (): ReduxAction => ({
        type: BillActionType.RESET_STATE
    }),
    requestBill: (page: number): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
        if (page === getState().bills.page) {
            return;
        }
        dispatch({
            page,
            type: BillActionType.REQUEST
        });
        BillApi.getBillsAsync(page)
            .then((bills: IBill[]) => {
                dispatch({
                    bills,
                    page,
                    type: BillActionType.RECEIVE
                });
            });
    },
};
