import React from 'react';
import { Container } from './styles';

//FC = Functional component
const Content: React.FC = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Content;
