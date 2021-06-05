import React, { useMemo } from 'react';
import { Container } from './styles';
import dollarImg from '../../assets/dollar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';
import CountUp from 'react-countup';

interface IWalletBoxProps {
  title: string;
  ammount: number;
  footerLabel: string;
  icon: 'dollar' | 'arrowUp' | 'arrowDown';
  color: string;
  animationTime?: any;
}

//FC = Functional component
const WalletBox: React.FC<IWalletBoxProps> = ({
  title,
  ammount,
  footerLabel,
  icon,
  color,
  animationTime = 0.5,
}) => {
  const iconSelected = useMemo(() => {
    switch (icon) {
      case 'dollar':
        return dollarImg;
      case 'arrowUp':
        return arrowUpImg;
      case 'arrowDown':
        return arrowDownImg;
      default:
        return '';
    }
  }, [icon]);

  return (
    <Container color={color} animationTime={animationTime}>
      <span>{title}</span>
      <h1>
        <strong>R$ </strong>
        <CountUp end={ammount} separator='.' decimal=',' decimals={2} />
      </h1>
      <small>{footerLabel}</small>
      <img src={iconSelected} alt={title} />
    </Container>
  );
};

export default WalletBox;
