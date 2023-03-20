import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import { Container, Brand, LoginButton } from './styles'
import { AuthUser } from '../../types/auth'
import { login } from '../../services/auth';
import Api from '../../Api';
import MessageBox from '../../components/MessageBox';
import { MessageType } from '../../types/site';

const LoginPage = () => {
  const [ authUser, setAuthUser ] = useState<AuthUser>({} as AuthUser);
  const [ error, setError ] = useState<string | undefined>();

  const handleChange = (e: any) => {
    setAuthUser({
      ...authUser,
      [e.target.name]: e.target.value
    });
  };

  let redirect = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Api.login(authUser).then((response) => {
      login(response.data.token);
      redirect.push("/");
    }).catch((err) => {
      setError("Credenciais incorretas!")
    })
  }

  return (
    <Container>
      <Brand>
        <img src="/assets/imgs/logo-hogwarts.png" alt="Hogwarts School"/>
        <h1>Hogwarts School</h1>
      </Brand>
      {error ? <MessageBox message={error} type={MessageType.ALERT} /> : ( null )}
      <form className="form-style" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Login</label>
          <input name="username" type="email" onChange={handleChange}/>
        </div>
        <div className="input-group">
          <label>Senha</label>
          <input name="password" type="password" onChange={handleChange}/>
        </div>

        <div className="button-group-centered">
          <LoginButton>Entrar</LoginButton>
        </div>
      </form>
    </Container>
  );
};

export default LoginPage;