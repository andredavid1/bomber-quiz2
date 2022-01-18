import axios from 'axios';
import useAuth from 'hooks/useAuth';
import { verify } from 'jsonwebtoken';
import LayoutCustomer from 'layouts/Customer';
import { NextPageContext } from 'next';
import { useEffect } from 'react';

const Home = () => {
  const { userLogged, logout, verify } = useAuth();

  useEffect(() => {
    verify();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutCustomer>
      <h1>Página Inicial</h1>
      <h2>Usuário logado: {userLogged?.name}</h2>
      <button onClick={logout}>Sair</button>
    </LayoutCustomer>    
  )
}

Home.getInitialProps = async (ctx: NextPageContext) =>  {
  let apiUrl = process.env.API_URL;

  if(!apiUrl) {
    apiUrl = 'http://localhost:3000/api'
  }

  if(ctx.req){
    const cookie = ctx.req.headers.cookie;

    if(cookie) {
      const response = await axios({
        method: 'POST',
        data: {token: cookie},
        url: `${apiUrl}/auth/verify`,
        headers: ctx.req ? { cookie } : undefined
      })

      if(!response.data.success) {
        if(ctx.res){
          ctx.res.writeHead(401, { Location: `${process.env.APP_URL}/login` })
          ctx.res.end();
          return
        }
      }
    } else {
      if(ctx.res){
        ctx.res.writeHead(401, { Location: `${process.env.APP_URL}/login` })
        ctx.res.end();
        return
      }
    }
  }

  return {
    props: {}
  }
}

export default Home
