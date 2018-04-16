import styled from 'styled-components';

export const AboutContainer = styled.div`
  padding: 0 80px;
  margin-top: 10px;

  @media (max-width: 700px) {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const AboutText = styled.p`
  margin: 5px 0;
  font-family: 'Montserrat';
  line-height: 25px;
`;

export const HeadshotContainer = styled.div`
  float: left;
  height: 320px;
  width: 350px;
  padding: 0 10px 10px 0;
  margin-top: 10px;

  @media (max-width: 700px) {
    float: unset;
    padding: 0 10px;
  }
`;

export const Headshot = styled.img`
  width: 100%;
  height: 100%;
`;
