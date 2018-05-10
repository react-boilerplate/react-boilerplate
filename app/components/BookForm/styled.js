import styled from 'styled-components';
import { Field as UnstyledField } from 'redux-form/immutable';

export const FieldContainer = styled.div`
  margin-bottom: 10px;
`;

export const Label = styled.label`
  display: block;
  font-family: 'Montserrat';
`;

export const Field = styled(UnstyledField)`
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  height: 25px;
  padding-left: 5px;
`;

export const FieldTextArea = Field.extend`
  height: 100px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
`;
