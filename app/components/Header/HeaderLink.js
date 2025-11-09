import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 2em;
  margin: 0.5em;
  text-decoration: none;
  border-radius: 6px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #41addd;
  color: #41addd;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    color: #fff;
    background: #41addd;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(65, 173, 221, 0.4);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300%;
    height: 300%;
    background: rgba(255, 255, 255, 0.1);
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
    transition: transform 0.5s ease, opacity 0.5s ease;
  }

  &:hover::after {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 2px 10px rgba(65, 173, 221, 0.3);
  }
`;
