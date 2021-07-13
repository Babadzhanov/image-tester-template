import { combineReducers } from 'redux';

import { Reducer as AppReducer } from '../controllers/App/Reducer';
import { AppState } from '../controllers/App/StateAndProps';

export interface IStoreState {
    app: AppState;
}

export const RootReducer = combineReducers({
    app: AppReducer,
})
