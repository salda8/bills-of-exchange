import { PartyApi } from '../../api';
import { IAppThunkAction, ReduxAction } from '../';
import { PartyActionType, IParty } from './types';

export const actionCreators = {
  resetState: (): ReduxAction => ({
        type: PartyActionType.RESET_STATE
  }),
  requestParty: (page: number): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
    if (page === getState().parties.page) {
      return;
    }
    dispatch({
        page,
        type: PartyActionType.REQUEST
    });
      PartyApi.getPartiesAsync(page)
        .then((parties: IParty[]) => {
        dispatch({
            parties,
            page,
            type: PartyActionType.RECEIVE
        });
      });
  },
};
