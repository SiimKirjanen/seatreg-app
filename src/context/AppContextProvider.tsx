import React, { useReducer, useEffect } from 'react';

import { IConnection } from '../interface';
import { ACTION_TYPE, reducer, ReducerAction } from '../reducers/AppContextReducer';
import { getStoredApiTokenData } from '../service/storage';

export type StateType = {
  connectionData: IConnection[];
};

export const initState: StateType = {
  connectionData: [],
};

export const AppContext = React.createContext<{
  state: StateType;
  dispatch: React.Dispatch<ReducerAction>;
}>({
  state: initState,
  dispatch: () => {},
});

const AppContextProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      const storedConnectionData = await getStoredApiTokenData();

      dispatch({
        type: ACTION_TYPE.SET_CONNECTION_ACTION,
        payload: storedConnectionData,
      });
    })();
  }, []);

  const [state, dispatch] = useReducer<React.Reducer<StateType, any>>(reducer, initState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
