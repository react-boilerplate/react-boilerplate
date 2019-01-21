import styled from 'styled-components';

const Content = styled.section`

  ${props => props.centered &&
    `
      text-align: center;
  `}

  a {
    color: ${({ theme }) => theme.colors.lightBlue};
    font-weight: bold;
    transition: 0.3s color ease-in;
    text-decoration: none;
  }

  strong {
    font-weight: 600;
  }
  ul,
  ol {
    margin: 0;
  }
`;

export default Content;
