import { createContext } from 'react';
import { User } from 'firebase/auth';

export interface UserContextValue {
  user: User;
  initializing: boolean;
  loading: boolean;
  setLoading: (payload: boolean) => void;
}

export const UserContext = createContext<UserContextValue>({} as UserContextValue);
