import useAuth from "hooks/useAuth";
import { NextPage } from "next"
import { ChangeEvent, FormEvent, useState } from "react";
import { Container } from "./styles";

const FormLogin: NextPage = () => {
  const {login} = useAuth();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await login(email, password);
  }
  
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2>BomberQuiz</h2>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" required value={email} onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" required value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
        </div>
        <div>
          <button type="submit">Entrar</button>
        </div>
      </form>
      
    </Container>
  )
}

export default FormLogin;