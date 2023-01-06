import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { useLocalState, getLocalState } from "./useLocalState";

export type AuthContextType = {
  setUser: React.Dispatch<React.SetStateAction<AuthContextType["user"]>>;
  user?: null | {
    email: string;
  };
};

export const AuthContext = createContext<AuthContextType>({
  setUser: () => {},
  user: null,
});

export function fetchAuthState() {
  return Promise.resolve(getLocalState<AuthContextType>("authState"));
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useUser() {
  return useAuth()?.user;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalState<AuthContextType["user"]>(
    "user",
    getLocalState<AuthContextType["user"]>("user")
  );
  const contextValue = useMemo(
    () => ({
      setUser,
      user,
    }),
    [user, setUser]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
