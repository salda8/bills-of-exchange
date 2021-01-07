import { actionCreators } from './actions';
import { FunctionReturnTypes, ReduxAction } from '../';
import { PartyActionType, IPartyState } from './types';

const initialState: IPartyState = {
    parties: [],
  isLoading: false
};

export const reducer = (
    state: IPartyState = initialState,
  incomingAction: FunctionReturnTypes<typeof actionCreators>
): IPartyState => {
  const action = incomingAction as ReduxAction;

  switch (action.type) {
      case PartyActionType.REQUEST:
      const { page } = action;
      return {
        ...state,
        page,
        isLoading: true
      };
      case PartyActionType.RECEIVE:
      if (action.page === state.page) {
        const { parties, page } = action;
          return {
              parties,
          page,
          isLoading: false
        };
      }

      return state;
    default:
      return state;
  }
};
