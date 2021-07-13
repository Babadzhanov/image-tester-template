export const TYPES = {
    DATA_LOADED: 0x20000001
}

export const ACTIONS = {
    DATA_LOADED: (e) => {
        return {
            type: TYPES.DATA_LOADED,
            data: e
        }
    }
}
