import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

type IInputProps = InputHTMLAttributes<HTMLInputElement>;

//FC = Functional component
const Input: React.FC<IInputProps> = ({ ...rest }) => {
  return <Container {...rest}></Container>;
};

export default Input;
