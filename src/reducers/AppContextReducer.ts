import { StateType } from '../context/AppContextProvider';

export const enum ACTION_TYPE {
  ADD_CONNECTION_ACTION = 'ADD_CONNECTION_ACTION',
  SET_CONNECTION_ACTION = 'SET_CONNECTION_ACTION',
  REMOVE_CONNECTION_ACTION = 'REMOVE_CONNECTION_ACTION',
}
export interface ReducerAction {
  type: ACTION_TYPE;
  payload?: any;
}

export const reducer = (state: StateType, action: ReducerAction) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_CONNECTION_ACTION:
      return { ...state, connectionData: [...state.connectionData, action.payload] };
    case ACTION_TYPE.SET_CONNECTION_ACTION:
      return { ...state, connectionData: action.payload };
    case ACTION_TYPE.REMOVE_CONNECTION_ACTION: {
      const filteredConnections = state.connectionData.filter(
        (data) => data.apiTokenId !== action.payload.apiTokenId
      );

      return { ...state, connectionData: filteredConnections };
    }
    default: {
      return state;
    }
  }
};
