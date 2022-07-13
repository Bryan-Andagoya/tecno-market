import { createContext } from 'react';
import { User } from 'firebase/auth';

export interface UserContextValue {
  user: User;
  initializing: boolean;
}

export const UserContext = createContext<UserContextValue>({} as UserContextValue);
