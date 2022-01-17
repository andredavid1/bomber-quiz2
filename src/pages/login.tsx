import FormLogin from "components/FormLogin";
import LayoutLogin from "layouts/Login";
import { NextPage } from "next";
import useAuth from "../hooks/useAuth";

const Login: NextPage = () => {
  const {loading} = useAuth();

  return (
    <LayoutLogin>
      <FormLogin />
    </LayoutLogin>
  )
}

export default Login;