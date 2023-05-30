import { ISearch } from '../interface';

type StateType = {
  searchParams: ISearch;
};

export const initState: StateType = {
  searchParams: {
    searchValue: '',
  },
};

export const enum ACTION_TYPE {
  UPDATE_SEARCH = 'UPDATE_SEARCH',
}
export interface ReducerAction {
  type: ACTION_TYPE;
  payload?: any;
}

export const bookingsReducer = (state: StateType, action: ReducerAction) => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_SEARCH:
      return { ...state, searchParams: { ...state.searchParams, searchValue: action.payload } };
    default: {
      return state;
    }
  }
};
