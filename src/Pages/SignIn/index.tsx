import React, { useState } from 'react';
import { Container, Logo, Form, FormTitle } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { useAuth } from '../../hooks/auth';

//FC = Functional component
const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { signIn } = useAuth();

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt='My wallet' />
        <h2>My wallet</h2>
      </Logo>

      <Form onSubmit={() => signIn(email, password)}>
        <FormTitle>Entrar</FormTitle>
        <Input
          required
          onChange={(e) => setEmail(e.target.value)}
          type='email'
        />
        <Input
          required
          onChange={(e) => setPassword(e.target.value)}
          type='password'
        />

        <Button type='submit'>Acessar</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
