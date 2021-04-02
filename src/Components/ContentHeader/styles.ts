import styled from 'styled-components';

interface ITitleContainerProps{
  lineColor: string
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin-bottom: 25px;

  
`;

export const TitleContainer = styled.div<ITitleContainerProps>`
//barrinha em baixo do titulo
  >h1 {
    
    &::after {
      content: '';
      display: block;
      width: 55px;
      border-bottom: 10px solid ${props => props.lineColor}
    }
    
    &:hover{
      &::after{
        transition: all 0.4s linear;
        width: 85px;
      }
    }
  
  }

`;

export const Controllers = styled.div`
  display: flex;
  
`;