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

export const AccordionContainerDiv = styled.div`
       border: solid  ${(props: IAccordionContainerProps) => props.borderWidth}px;
    border-bottom-width: 0;
    width: auto;
`;

// ⚠️ EMPTY BLOCK ⚠️
export const Button = styled.button`

`

// ⚠️ BAD INDENTATION ⚠️
export const Button2 = styled.button`

color: blue;
`