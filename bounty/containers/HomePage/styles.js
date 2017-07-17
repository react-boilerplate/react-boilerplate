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
  justify-content: center;
  align-items: stretch;
`;

export const OneThirtSection = styled(Section)`
  flex-grow: 1;
  justify-content: center;
  align-items: stretch;
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
  border-radius: 0.125rem;
`;

export const CheckButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 6rem;

  cursor: pointer;
  margin-left: 0.5rem;
  border-radius: 0.125rem;
  background-color: #4d8ed2;
  color: #ffffff;

  font-variant: small-caps;
  font-weight: 600;
  letter-spacing: 0.03rem;

  &:hover {
    filter: drop-shadow(2px 2px 0px rgba(27, 65, 106, 0.25));
    transform: translateY(-1px);
  }

  &:active {
    filter: none;
    transform: translateY(0);
    box-shadow: inset ${bso}px ${bso}px ${bsw}px ${bwc}, inset -${bso}px -${bso}px ${bsw}px ${bwc};
  }
`;
