import { StateType } from '../context/AppContextProvider';

export const enum ACTION_TYPE {
  ADD_TOKEN_ACTION = 'ADD_TOKEN_ACTION',
  SET_TOKENS_ACTION = 'SET_TOKENS_ACTION',
  REMOVE_TOKEN_ACTION = 'REMOVE_TOKEN_ACTION',
}
interface ReducerAction {
  type: ACTION_TYPE;
  payload?: any;
}

export const reducer = (state: StateType, action: ReducerAction) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_TOKEN_ACTION:
      return { ...state, tokenData: [...state.tokenData, action.payload] };
    case ACTION_TYPE.SET_TOKENS_ACTION:
      return { ...state, tokenData: action.payload };
    case ACTION_TYPE.REMOVE_TOKEN_ACTION: {
      const filteredTokens = state.tokenData.filter(
        (data) => data.apiTokenId !== action.payload.apiTokenId
      );

      return { ...state, tokenData: filteredTokens };
    }
    default: {
      return state;
    }
  }
};
