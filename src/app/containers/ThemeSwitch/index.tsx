import React from 'react';
import { FormLabel } from 'app/components/FormLabel';
import { Radio } from './components/Radio';
import styled from 'styled-components/macro';
import { changeTheme, selectThemeKey } from 'styles/theme/slice';
import { useDispatch, useSelector } from 'react-redux';
import { saveTheme } from 'styles/theme/utils';
import { ThemeKeyType } from 'styles/theme/types';

export function ThemeSwitch() {
  const theme = useSelector(selectThemeKey);

  const dispatch = useDispatch();

  const handleThemeChange = (theme: ThemeKeyType) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      saveTheme(theme);
      dispatch(changeTheme(theme));
    };
  };
  return (
    <Wrapper>
      <FormLabel>Select Theme</FormLabel>
      <Themes>
        <Radio
          id="default"
          label="System theme"
          className="radio"
          name="theme"
          onChange={handleThemeChange('system')}
          value="default"
          isSelected={theme === 'system'}
        />
        <Radio
          id="light"
          label="Light"
          className="radio"
          name="theme"
          onChange={handleThemeChange('default')}
          value="light"
          isSelected={theme === 'default'}
        />
        <Radio
          id="dark"
          label="Dark"
          className="radio"
          name="theme"
          onChange={handleThemeChange('dark')}
          value="dark"
          isSelected={theme === 'dark'}
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
