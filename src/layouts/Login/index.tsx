import { NextPage } from "next";
import { ReactNode } from "react"
import { Container } from "./styles"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loading from "components/Loading";
import useConfig from "hooks/useConfig";


interface ILayoutLoginProps {
  children: ReactNode;
}

const LayoutLogin: NextPage<ILayoutLoginProps> = ({children}) => {
  const {loading} = useConfig();
  
  return (
    <Container>
      {children}
      <ToastContainer position="top-right" />
      <Loading show={loading} />
    </Container>
  )
}

export default LayoutLogin;