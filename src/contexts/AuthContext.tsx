import axios from "axios";
import { getCookie, removeCookies } from "cookies-next";
import useConfig from "hooks/useConfig";
import Router from "next/router";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";

interface IUserLogged {
  id: string;
  name: string;
  level: string;
}

interface IAuthContextProps {
  userLogged: IUserLogged | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verify: () => Promise<boolean>;
}

const AuthContext = createContext({
  userLogged: null,
} as IAuthContextProps)

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({children}: IAuthProviderProps) => {
  const { toggleLoading } = useConfig();
  const [userLogged, setUserLogged] = useState<IUserLogged | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    toggleLoading(true);

    await axios.post('/api/auth/login', {email, password}).then(response => {
      setUserLogged(response.data.payload)

      Router.push('/');
    }).catch(err => {
      toast.error(err.response.data.error)
    }).finally(async () => {
      toggleLoading(false)
    })
  }

  const logout = async (): Promise<void> => {
    toggleLoading(true);

    removeCookies('tokenBomberQuiz')

    toggleLoading(false);

    Router.push("/login")
  }

  const verify = async (): Promise<boolean> => {
    toggleLoading(true);

    const token = getCookie('tokenBomberQuiz');

    await axios.post('/api/auth/verify', {token}).then(response => {
      setUserLogged(response.data.payload)

      return true
    }).catch(err => {
      toast.error(err.response.data.error)
      return false
    }).finally(async () => {
      toggleLoading(false);
    })
    return true;
  }

  return (
    <AuthContext.Provider value={{ userLogged, login, logout, verify }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;   