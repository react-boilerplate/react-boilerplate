import styled from 'styled-components';

export const Article = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;

  align-items: stretch;
  justify-content: flex-start;
`;

export const Section = styled.section`
  display: flex;
`;

export const CenteredSection = styled(Section)`
  justify-content: center;
`;
