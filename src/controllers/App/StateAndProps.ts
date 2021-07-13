
import * as ReactRedux from 'react-redux';

import { iActionType, Translation, INIT_TRANSLATIONS, Dictionary, iData, iNavData } from '../../models/models';
export const STATE_KEY = 'app';

export interface AppProps extends ReactRedux.DispatchProp<any> {
	appState: AppState;
	loadData: (e) => iActionType;
	getDeeplinkEl: (e) => iActionType;
}

export interface AppState {
	locale: Translation;
	data: Dictionary<iData>;
	deeplinkHtml: string;
	navData: iNavData[];
}
export const AppInitState: AppState = {
	locale: INIT_TRANSLATIONS,
	data: null,
	deeplinkHtml: null,
	navData: null,
}

export interface inAppState {
}

export const inAppInitialState: inAppState = {
}
