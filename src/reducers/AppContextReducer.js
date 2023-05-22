export const ADD_TOKEN_ACTION = 'ADD_TOKEN_ACTION';
export const initState = {
    apiTokens: []
};
export const reducer = (state, action) => {
    switch(action.type) {
        case ADD_TOKEN_ACTION:
            return {...state, apiTokens: [...state.apiTokens, action.payload]};
        default: {
            state;
        }
    }
};