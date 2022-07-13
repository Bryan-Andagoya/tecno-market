import { UserProvider } from '../UserProvider';

interface Props {
  children: JSX.Element;
}

export const RootProvider = ({ children }: Props) => {
  return <UserProvider>{children}</UserProvider>;
};
