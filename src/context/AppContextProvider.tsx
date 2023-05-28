import React, { useReducer, useEffect } from 'react';

import { IToken } from '../interface';
import { ACTION_TYPE, reducer } from '../reducers/AppContextReducer';
import { getStoredApiTokenData } from '../service/secureStore';

export type StateType = {
  tokenData: IToken[];
};

export const initState: StateType = {
  tokenData: [],
};

export const AppContext = React.createContext({});

const AppContextProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      const storedTokenData = await getStoredApiTokenData();

      dispatch({
        type: ACTION_TYPE.SET_TOKENS_ACTION,
        payload: storedTokenData,
      });
    })();
  }, []);

  const [state, dispatch] = useReducer<React.Reducer<StateType, any>>(reducer, initState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
