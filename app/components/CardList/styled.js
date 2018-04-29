import styled from 'styled-components';

export const CardsContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  padding: 10px 5%;
`;

export const CardFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardWrapper = styled.div`
  width: 275px;
  height: 418px;
  border: 1px solid darkgrey;
  box-shadow: 2px 2px 20px 1px grey;
  background: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  display: flex;
  flex-direction: column-reverse;
  align-self: flex-start;
  margin: 5px;
  position: relative;
`;

export const TextWrapper = styled.div`
  height: 33%;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  padding: 5%;
  overflow: hidden;
`;

export const CardHeader = styled.span`
  font-family: 'Montserrat';
  margin: 0;
  font-weight: bold;
  font-size: 0.9em;
  font-style: italic;
`;

export const CardText = styled.p`
  margin: 0;
  font-family: 'Montserrat';
  text-overflow: ellipsis;
  font-size: 0.8em;
`;
