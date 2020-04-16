import React from 'react';
import { FormLabel } from 'app/components/FormLabel';
import { Radio } from './components/Radio';
import styled from 'styled-components/macro';
import { changeTheme, initialState } from 'styles/theme/slice';
import { useDispatch } from 'react-redux';
import { ThemeKeyType } from 'styles/theme/types';

type ChangeThemeType = 'default' | 'light' | 'dark';
export function ThemeSwitch() {
  const dispatch = useDispatch();

  const handleThemeChange = (type: ChangeThemeType) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      let theme: ThemeKeyType = 'default';
      switch (type) {
        case 'default':
          theme = initialState.selected;
          break;
        case 'light':
          theme = 'default';
          break;
        case 'dark':
          theme = 'dark';
          break;
        default:
          break;
      }
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
          onChange={handleThemeChange('default')}
          value="default"
        />
        <Radio
          id="light"
          label="Light"
          className="radio"
          name="theme"
          onChange={handleThemeChange('light')}
          value="light"
        />
        <Radio
          id="dark"
          label="Dark"
          className="radio"
          name="theme"
          onChange={handleThemeChange('dark')}
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
