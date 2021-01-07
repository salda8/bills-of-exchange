import { BillApi } from '../../api';
import { IAppThunkAction, ReduxAction } from '../';
import { BillDetailActionType, IBillDetail } from './types';

export const actionCreators = {
    resetState: (): ReduxAction => ({
        type: BillDetailActionType.RESET_STATE
    }),
    requestBillDetail: (id: number): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
        if (id === getState().billDetail.id) {
            return;
        }
        dispatch({
            id,
            type: BillDetailActionType.REQUEST
        });
        BillApi.getBillDetailAsync(id)
            .then((billDetail: IBillDetail) => {
                dispatch({
                    billDetail,
                    id,
                    type: BillDetailActionType.RECEIVE
                });
            });
    },
};
