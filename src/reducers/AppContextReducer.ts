import { initState } from '../context/AppContextProvider';
export const ADD_TOKEN_ACTION = 'ADD_TOKEN_ACTION';

export const enum ACTION_TYPE {
    ADD_TOKEN_ACTION = 'ADD_TOKEN_ACTION'
}

interface ReducerAction {
    type: ACTION_TYPE,
    payload?: string|object
}

export const reducer = (state: typeof initState, action: ReducerAction) => {
    switch(action.type) {
        case ACTION_TYPE.ADD_TOKEN_ACTION:
            return {...state, apiTokens: [...state.apiTokens, action.payload]};
        default: {
            state;
        }
    }
};