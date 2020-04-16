import React from 'react';
import { FormLabel } from 'components/FormLabel';
import { Radio } from 'components/Radio';
import styled from 'styled-components/macro';

export function ThemeSwitch() {
  const handleThemeChange = (e: any) => {
    console.log(e.target.value);
  };
  return (
    <Wrapper>
      <FormLabel>Select Theme</FormLabel>
      <Themes>
        <Radio
          id="default"
          label="Default"
          className="radio"
          name="theme"
          onChange={handleThemeChange}
          value="default"
        />
        <Radio
          id="light"
          label="Light"
          className="radio"
          name="theme"
          onChange={handleThemeChange}
          value="light"
        />
        <Radio
          id="dark"
          label="Dark"
          className="radio"
          name="theme"
          onChange={handleThemeChange}
          value="dark"
        />
      </Themes>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${FormLabel} {
    margin-bottom: 0.625rem;
  }
`;
const Themes = styled.div`
  display: flex;

  .radio {
    margin-right: 1.5rem;
  }
`;
