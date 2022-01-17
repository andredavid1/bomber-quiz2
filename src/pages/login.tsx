import FormLogin from "components/FormLogin";
import LayoutLogin from "layouts/Login";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <LayoutLogin>
      <FormLogin />
    </LayoutLogin>
  )
}

export default Login;