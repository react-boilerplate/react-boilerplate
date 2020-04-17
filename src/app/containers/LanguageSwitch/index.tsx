import React from 'react';
import { FormLabel } from 'app/components/FormLabel';
import { Radio } from 'app/components/Radio';
import styled from 'styled-components/macro';

export function LanguageSwitch() {
  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <Wrapper>
      <FormLabel>Select Language</FormLabel>
      <Languages>
        <Radio
          id="en"
          label="English"
          className="radio"
          name="language"
          onChange={handleLanguageChange}
          value="en"
          /* isSelected={lang === 'en'} */
        />
        <Radio
          id="tr"
          label="Deutsch"
          className="radio"
          name="language"
          onChange={handleLanguageChange}
          value="de"
          /* isSelected={lang === 'de'} */
        />
      </Languages>
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
const Languages = styled.div`
  display: flex;

  .radio {
    margin-right: 1.5rem;
  }
`;
