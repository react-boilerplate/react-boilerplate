import * as PropTypes from 'prop-types';
import * as React from 'react';
import { InputEventListener, InputTargetElement } from './types';
interface EventStackProps {
    /** An event name on which we will subscribe. */
    name: string;
    /** An event handler or array of event handlers. */
    on: InputEventListener;
    /** A name of pool. */
    pool?: string;
    /** A DOM element on which we will subscribe. */
    target?: InputTargetElement;
}
/**
 * This component exposes the EventStack API as public and provides a declarative way to manage it.
 */
export default class EventStack extends React.PureComponent<EventStackProps> {
    static propTypes: {
        /** An event name on which we will subscribe. */
        name: PropTypes.Validator<string>;
        /** An event handler or array of event handlers. */
        on: PropTypes.Validator<((...args: any[]) => any) | (((...args: any[]) => any) | null)[]>;
        /** A name of pool. */
        pool: PropTypes.Requireable<string>;
        /** A DOM element on which we will subscribe. */
        target: PropTypes.Requireable<Object>;
    };
    static defaultProps: {
        pool: string;
        target: string;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: EventStackProps): void;
    componentWillUnmount(): void;
    subscribe(props: Readonly<EventStackProps>): void;
    unsubscribe(props: Readonly<EventStackProps>): void;
    render(): null;
}
export {};
