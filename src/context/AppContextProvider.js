import React, { useReducer } from 'react';

export const ADD_TOKEN_ACTION = 'ADD_TOKEN_ACTION';
const initState = {
    apiTokens: []
};
const reducer = (state, action) => {
    switch(action.type) {
        case ADD_TOKEN_ACTION:
            return {...state, apiTokens: [...state.apiTokens, action.payload]};
    }
};

export const AppContext = React.createContext({});
const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <AppContext.Provider
            value={{state, dispatch}}
        >
            {children}
        </AppContext.Provider>
  );
};

export default AppContextProvider;