import React from 'react';

import { ReducerAction } from '../reducers/AppContextReducer';
import { StateType } from '../types';

export const initState: StateType = {
  connectionData: [],
  globalConfig: {
    alerts: [],
  },
  initializing: true,
};

export const AppContext = React.createContext<{
  state: StateType;
  dispatch: React.Dispatch<ReducerAction>;
}>({
  state: initState,
  dispatch: () => {},
});
