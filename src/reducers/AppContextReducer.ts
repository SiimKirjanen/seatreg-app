import { StateType } from '../context/AppContextProvider';

export const enum ACTION_TYPE {
    ADD_TOKEN_ACTION = 'ADD_TOKEN_ACTION'
}
interface ReducerAction {
    type: ACTION_TYPE,
    payload?: any
}

export const reducer = (state: StateType, action: ReducerAction) => {
    switch(action.type) {
        case ACTION_TYPE.ADD_TOKEN_ACTION:
            return {...state, apiTokens: [...state.apiTokens, action.payload]};
        default: {
            return state;
        }
    }
};