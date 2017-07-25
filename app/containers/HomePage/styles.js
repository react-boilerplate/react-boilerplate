import styled from 'styled-components';

const bso = 1;
const bsw = 5;
const bwc = 'rgba(39, 39, 39, 0.25)';

export const Article = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;

  align-items: stretch;
  justify-content: flex-start;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const CenteredSection = styled(Section)`
  justify-content: center;
`;

export const TwoThirdSection = styled(Section)`
  flex-grow: 2;
  justify-content: space-around;
  align-items: stretch;
`;

export const OneThirtSection = styled(Section)`
  flex-grow: 1;
  justify-content: center;
  align-items: stretch;
`;

export const ResultMessage = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: stretch;

  & > span {
    align-items: center;
    display: flex;
    flex: 1;
    font-size: 1.125rem;
    justify-content: center;
  }
`;

export const Header = styled.div`
  align-items: stretch;
  display: flex;
  justify-content: center;

  & > span {
    color: #407dc9;
    display: flex;
    flex: 1;
    font-size: 2.0rem;
    font-variant: small-caps;
    font-weight: 600;
    justify-content: center;
    letter-spacing: 0.125rem;
    line-height: 0;
  }
`;

export const EmailLabel = styled.label`
  display: flex;
  flex: 1;
  align-items: stretch;
`;

export const Input = styled.input`
  display: flex;
  flex: 1;

  line-height: 3rem;
  background-color: #ffffff;

  padding: 0.5rem 1rem;

  outline: none;
  border: none;
  border-radius: 0.25rem;
  font-size: 2rem;

  user-select: all;
  pointer-events: all;

  border: 2px solid rgba(64, 125, 201, 0.5);
  color: #407dc9;

  &:disabled {
    opacity: 0.5;
    cursor: progress;
    pointer-events: none;
  }

  &:focus {
    border-color: #407dc9;
  }
`;

export const CheckButton = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 10rem;

  cursor: pointer;
  margin-left: 0.5rem;
  border-radius: 0.125rem;
  background-color: #4d8ed2;
  color: #ffffff;

  font-variant: small-caps;
  font-weight: 600;
  letter-spacing: 0.03rem;

  pointer-events: all;

  &:not(:disabled):hover {
    filter: drop-shadow(2px 2px 0px rgba(27, 65, 106, 0.25));
    transform: translateY(-1px);
  }

  &:not(:disabled):active {
    filter: none;
    transform: translateY(0);
    box-shadow: inset ${bso}px ${bso}px ${bsw}px ${bwc}, inset -${bso}px -${bso}px ${bsw}px ${bwc};
  }

  &:not(:disabled):focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: progress;
    pointer-events: none;
  }

`;

export const Form = styled.form`
  margin-bottom: 1em;
`;
