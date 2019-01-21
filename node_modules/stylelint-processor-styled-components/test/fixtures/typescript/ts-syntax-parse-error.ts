import * as React from 'react';
import styled, { keyframes } from 'styled-components';

export interface IAccordionContainerProps {
    className?: string;
    borderWidth: number,
    onChange?(id: string): void;
}
export interface IAccordionContainerState {
    selected: string;
}

export const AccordionContainerDiv = styled.div<{ width#: string }>`
  border: solid  ${(props: IAccordionContainerProps) => props.borderWidth}px;
  border-bottom-width: 0;
  width: auto;
`;