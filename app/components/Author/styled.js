import styled from 'styled-components';

export const AboutContainer = styled.div`
  padding: 0 5%;
  display: flex;
  justify-content: center;

  @media (max-width: 916px) {
    float: left;
    display: unset;
  }

  @media (max-width: 591px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ImageWrapper = styled.div`
  height: 284px;
  width: 340px;
  padding: 30px 30px 0;

  @media (max-width: 916px) {
    float: left;
  }

  @media (max-width: 591px) {
    float: unset;
  }
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
  border: 1px solid #0000001c;
`;

export const TextContainer = styled.div`
  padding: 35px;
  width: 60%;

  @media (max-width: 916px) {
    width: unset;
  }
`;

export const Text = styled.p`
  margin: 0;
  font-family: 'Montserrat';
`;
