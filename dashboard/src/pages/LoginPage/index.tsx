import React, { useState } from 'react';
import { Container, Brand, LoginButton } from './styles'
import { AuthUser } from '../../types/auth'

const LoginPage = () => {
  const [ authUser, setAuthUser ] = useState<AuthUser>({} as AuthUser);

  const handleChange = (e: any) => {
    setAuthUser({
      ...authUser,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container>
      <Brand>
        <img src="/assets/imgs/logo-hogwarts.png" alt="Hogwarts School"/>
        <h1>Hogwarts School</h1>
      </Brand>
      <form className="form-style">
        <div className="input-group">
          <label>Login</label>
          <input name="email" type="email" value={authUser.email} onChange={handleChange}/>
        </div>
        <div className="input-group">
          <label>Senha</label>
          <input name="password" type="password" value={authUser.password} onChange={handleChange}/>
        </div>

        <div className="button-group-centered">
          <LoginButton>Entrar</LoginButton>
        </div>
      </form>
    </Container>
  );
};

export default LoginPage;