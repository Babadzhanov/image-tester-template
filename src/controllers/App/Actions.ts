import { APP_START } from '../../constants';

export const TYPES = {
    DATA_LOADED: APP_START | 0x00001,
    GET_DEEPLINK: 'GET_DEEPLINK',
};

export const ACTIONS = {
    DATA_LOADED: (data: any) => ({
        data,
        type: TYPES.DATA_LOADED,
    }),
    GET_DEEPLINK: (data: any) => ({
        data,
        type: TYPES.GET_DEEPLINK,
    }),
};
