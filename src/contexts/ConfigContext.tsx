import { createContext, ReactNode, useState } from "react";
import { AuthProvider } from "./AuthContext";

interface IConfigContextProps {
  loading: boolean;
  toggleLoading: (show: boolean) => void;
}

const ConfigContext = createContext({
  loading: false,
} as IConfigContextProps)

interface IConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider = ({children}: IConfigProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const toggleLoading = (show: boolean) => {
    setLoading(show);
  }

  return (
    <ConfigContext.Provider value={{ loading, toggleLoading }}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ConfigContext.Provider>
  )
}

export default ConfigContext;
