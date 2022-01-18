import type { NextApiRequest, NextApiResponse } from 'next'
import AppError from 'errors/AppError';
import { verify } from 'jsonwebtoken';

interface IUserLogged {
  id: string;
  name: string;
  level: string;
}

interface IResponse {
  success: boolean;
  payload?: IUserLogged;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const { method } = req;
  const { token } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  switch (method) {
    case "POST":
      try {
        let tokenBomberQuiz = token.split("tokenBomberQuiz=")[1];

        if(!tokenBomberQuiz) {
          tokenBomberQuiz = token;
        }

        if(!tokenBomberQuiz) {
          throw new AppError('Acesso não autorizado.', 401);
          if(res){
            res.writeHead(401, { Location: '/login' })
            res.end();
            return
          }
        }

        if(!jwtSecret) {
          throw new AppError('Variável de ambiente JWT_SECRET não encontrada.', 400)
        }

        const payload = verify(tokenBomberQuiz, jwtSecret)

        if(!payload) {
          throw new AppError('Acesso não autorizado.', 401);
        }

        const userLogged = { id: payload.id, name: payload.name, level: payload.level }
    
        return res.status(200).json({ success: true, payload: userLogged });
      } catch (err: any) {
        if(err instanceof AppError){
          return res.status(err.statusCode).json({ success: false, error: err.message})
        } else{
          return res.status(500).json({ success: false, error: 'Erro na conexão com o servidor.' });
        }
      }
      break;
  
    default:
      return res.status(405).json({ success: false, error: 'Método não suportado.'})
      break;
  }  
}
