import React, { useReducer } from 'react';
import { reducer } from '../reducers/AppContextReducer';

export const initState = {
    apiTokens: []
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