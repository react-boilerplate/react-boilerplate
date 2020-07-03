import styled from 'styled-components/macro';

export const Input = styled.input`
  border: 2px solid ${p => p.theme.border};
  border-radius: 4px;
  color: ${p => p.theme.text};
  display: block;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${p => p.theme.text};
  background-color: ${p => p.theme.background};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline: none;
  height: 2.75rem;
  padding: 0 0.75rem;

  &::placeholder {
    font-weight: 300;
    color: ${p => p.theme.textSecondary};
  }

  &:focus {
    border-color: ${p => p.theme.primary};
    box-shadow: 0 0 0 3px
      ${p =>
        p.theme.primary.replace(
          /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
          'rgba$1,0.2)',
        )};
  }
`;
