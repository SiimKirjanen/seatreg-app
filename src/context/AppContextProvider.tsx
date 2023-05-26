import React, { useReducer } from 'react';
import { reducer } from '../reducers/AppContextReducer';

export type StateType = {
    apiTokens: object[];
};

export const initState: StateType = {
    apiTokens: []
};

export const AppContext = React.createContext({});

const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer<React.Reducer<StateType, any>>(
        reducer, 
        initState
    );

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
  );
};

export default AppContextProvider;