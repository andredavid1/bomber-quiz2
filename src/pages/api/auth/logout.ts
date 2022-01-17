import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from 'lib/mongodb';
import AppError from 'errors/AppError';

interface IResponse {
  success: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        await connectDB();
    
        res.status(200).json({ success: true });
      } catch (err: any) {
        if(err instanceof AppError){
          res.status(err.statusCode).json({ success: false, error: err.message})
        } else{
          res.status(500).json({ success: false, error: 'Erro na conexão com o servidor.' });
        }
      }
      break;
  
    default:
      res.status(405).json({ success: false, error: 'Método não suportado.'})
      break;
  }  
}
