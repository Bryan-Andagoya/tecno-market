import { auth } from 'app/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useReducer } from 'react';
import { SET_INITIALIZING, SET_LOADING, SET_USER } from './actions';
import { UserContext, UserContextValue } from './UserContext';
import { userReducer } from './userReducer';

interface Props {
  children: JSX.Element;
}

export interface InitialState {
  user: User | null;
  initializing: boolean;
  loading: boolean;
}

const initialState: InitialState = {
  user: null,
  initializing: true,
  loading: false,
};

export const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (payload: User | null) => {
    dispatch({
      type: SET_USER,
      payload,
    });
  };

  const setInitializing = (payload: boolean) => {
    dispatch({
      type: SET_INITIALIZING,
      payload,
    });
  };

  const setLoading = (payload: boolean) => {
    dispatch({
      type: SET_LOADING,
      payload,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      state.initializing && setInitializing(false);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const userContextValue: UserContextValue = {
    user: state.user,
    initializing: state.initializing,
    loading: state.loading,
    setLoading,
  };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};
