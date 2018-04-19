import styled from 'styled-components';

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px 5%;
`;

export const CardWrapper = styled.div`
  width: 275px;
  height: 418px;
  border: 1px solid darkgrey;
  box-shadow: 2px 2px 20px 1px grey;
  display: flex;
  flex-direction: column-reverse;
  background: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

export const TextWrapper = styled.div`
  height: 50%;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  padding: 5%;
  overflow: hidden;
`;

export const CardHeader = styled.span`
  font-family: 'Montserrat';
  margin: 0;
  font-weight: bold;
`;

export const CardText = styled.p`
  margin: 0;
  font-family: 'Montserrat';
  text-overflow: ellipsis;
  font-size: 12px;
`;
