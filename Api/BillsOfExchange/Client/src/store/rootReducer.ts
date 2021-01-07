import { History } from 'history';
import { combineReducers } from 'redux';
import { IApplicationState } from './index';
import { connectRouter } from 'connected-react-router';
import { reducer as PartiesReducer } from './party';
import { reducer as BillsReducer } from './bill';
import { reducer as BillDetailReducer } from './billdetail';


const rootReducer = (history: History) =>
  combineReducers<IApplicationState>({
    router: connectRouter(history),
      parties: PartiesReducer,
      bills: BillsReducer,
      billDetail: BillDetailReducer,
  });

export default rootReducer;