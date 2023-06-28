import React, { useReducer, useEffect } from 'react';

import { AppContext, initState } from '../context/AppContext';
import { useAppState } from '../hooks/useAppState';
import { ACTION_TYPE, reducer } from '../reducers/AppContextReducer';
import { getGlobalConfig, getStoredApiTokenData } from '../service/storage';
import { StateType } from '../types';

const AppContextProvider = ({ children }) => {
  const [appStateVisible] = useAppState();

  useEffect(() => {
    (async () => {
      if (appStateVisible === 'active') {
        const storedConnectionData = await getStoredApiTokenData();
        const globalConfig = await getGlobalConfig();

        dispatch({
          type: ACTION_TYPE.SET_CONNECTIONS_ACTION,
          payload: storedConnectionData,
        });
        dispatch({
          type: ACTION_TYPE.SET_GLOBAL_CONFIG,
          payload: globalConfig,
        });
      }
    })();
  }, [appStateVisible]);

  const [state, dispatch] = useReducer<React.Reducer<StateType, any>>(reducer, initState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
