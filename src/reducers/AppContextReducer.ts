import { StateType } from '../types';
import { getConnectionKey } from '../utils/strings';

export const enum ACTION_TYPE {
  ADD_CONNECTION_ACTION = 'ADD_CONNECTION_ACTION',
  SET_CONNECTIONS_ACTION = 'SET_CONNECTIONS_ACTION',
  REMOVE_CONNECTION_ACTION = 'REMOVE_CONNECTION_ACTION',
  CHANGE_CONNECTION_OPTIONS = 'CHANGE_CONNECTION_OPTIONS',
  CHANGE_BOOKINGS = 'CHANGE_BOOKINGS',
  SET_GLOBAL_CONFIG = 'SET_GLOBAL_CONFIG',
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
    case ACTION_TYPE.CHANGE_BOOKINGS: {
      const updatedConnectionData = state.connectionData.map((connection) => {
        if (getConnectionKey(connection) === getConnectionKey(action.payload)) {
          console.log('Found what to change!');
          console.log('Before ', connection.bookings.length);
          console.log('After ', action.payload.bookings.length);
          return {
            ...connection,
            bookings: action.payload.bookings,
          };
        }
        return connection;
      });

      return { ...state, connectionData: updatedConnectionData };
    }
    case ACTION_TYPE.SET_GLOBAL_CONFIG: {
      return { ...state, globalConfig: action.payload };
    }
    default: {
      return state;
    }
  }
};
