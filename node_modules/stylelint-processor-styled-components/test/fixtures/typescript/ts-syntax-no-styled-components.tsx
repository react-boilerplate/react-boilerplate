export interface IAccordionContainerProps {
    className?: string;
    borderWidth: number,
    onChange?(id: string): void;
}
export interface IAccordionContainerState {
    selected: string;
}

export default (prop:IAccordionContainerProps) => (<div>Test</div>);