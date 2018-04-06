import styled from 'styled-components';

export const Navbar = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  height: 80px;
  background: tomato;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.h1`
  margin: 0;
  display: inline-block;
  font-family: 'Permanent Marker', cursive;
  font-size: 2em;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  width: 40%;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
`;

export const Button = styled.div`
  width: 30%;
  display: inline-block;
  height: 20px;
`;

export const ButtonText = styled.p`
  margin: 0;
  font-family: 'Montserrat';
  cursor: pointer;
`;
