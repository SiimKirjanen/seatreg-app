import { StateType } from '../providers/AppContextProvider';
import { getConnectionKey } from '../utils/strings';

export const enum ACTION_TYPE {
  ADD_CONNECTION_ACTION = 'ADD_CONNECTION_ACTION',
  SET_CONNECTIONS_ACTION = 'SET_CONNECTIONS_ACTION',
  REMOVE_CONNECTION_ACTION = 'REMOVE_CONNECTION_ACTION',
  CHANGE_CONNECTION_OPTIONS = 'CHANGE_CONNECTION_OPTIONS',
}
export interface ReducerAction {
  type: ACTION_TYPE;
  payload?: any;
}

export const reducer = (state: StateType, action: ReducerAction) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_CONNECTION_ACTION:
      return { ...state, connectionData: [...state.connectionData, action.payload] };
    case ACTION_TYPE.SET_CONNECTIONS_ACTION:
      return { ...state, connectionData: action.payload, initializing: false };
    case ACTION_TYPE.REMOVE_CONNECTION_ACTION: {
      const filteredConnections = state.connectionData.filter(
        (data) => data.apiTokenId !== action.payload.apiTokenId
      );

      return { ...state, connectionData: filteredConnections };
    }
    case ACTION_TYPE.CHANGE_CONNECTION_OPTIONS: {
      const updatedConnectionData = state.connectionData.map((connection) => {
        if (getConnectionKey(connection) === action.payload.activeOptionConnectionKey) {
          return {
            ...connection,
            localNotifications: action.payload.localNotifications,
          };
        }
        return connection;
      });

      return { ...state, connectionData: updatedConnectionData };
    }
    default: {
      return state;
    }
  }
};
