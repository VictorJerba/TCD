import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthResponse, UserResponse } from "../dtos/auth.dto";

interface AuthContextType {
  user: UserResponse | null;
  signIn: (data: AuthResponse) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const userStoraged = localStorage.getItem("user");

    if (userStoraged) {
      setUser(JSON.parse(userStoraged));
    }
  }, []); // <- faltava fechar corretamente

  function signIn(data: AuthResponse) {
    setUser(data.user);

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.accessToken);
  }

  function signOut() {
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
