import { NextPage } from "next";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import Loading from "components/Loading";
import useConfig from "hooks/useConfig";

import { Container } from "./styles";
import "react-toastify/dist/ReactToastify.css";

interface ILayoutCustomerProps {
  children: ReactNode;
}

const LayoutCustomer: NextPage<ILayoutCustomerProps> = ({children}) => {
  const { loading } = useConfig();

  return (
    <Container>
      {children}
      <ToastContainer position="top-right" />
      <Loading show={loading} />
    </Container>
  )
}

export default LayoutCustomer;
