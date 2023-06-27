import React, { useReducer, useEffect } from 'react';

import { useAppState } from '../hooks/useAppState';
import { IConnection } from '../interface';
import { ACTION_TYPE, reducer, ReducerAction } from '../reducers/AppContextReducer';
import { getStoredApiTokenData } from '../service/storage';

export type StateType = {
  connectionData: IConnection[];
  initializing: boolean;
};

export const initState: StateType = {
  connectionData: [],
  initializing: true,
};

export const AppContext = React.createContext<{
  state: StateType;
  dispatch: React.Dispatch<ReducerAction>;
}>({
  state: initState,
  dispatch: () => {},
});

const AppContextProvider = ({ children }) => {
  const [appStateVisible] = useAppState();

  useEffect(() => {
    (async () => {
      if (appStateVisible === 'active') {
        const storedConnectionData = await getStoredApiTokenData();

        dispatch({
          type: ACTION_TYPE.SET_CONNECTIONS_ACTION,
          payload: storedConnectionData,
        });
      }
    })();
  }, [appStateVisible]);

  const [state, dispatch] = useReducer<React.Reducer<StateType, any>>(reducer, initState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
