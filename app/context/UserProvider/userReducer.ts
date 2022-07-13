import { InitialState } from '.';
import { SET_INITIALIZING, SET_USER } from './actions';

type Action = { type: string; payload: any };

export const userReducer = (state: InitialState, { type, payload }: Action) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case SET_INITIALIZING:
      return {
        ...state,
        initializing: payload,
      };
    default:
      return state;
  }
};
