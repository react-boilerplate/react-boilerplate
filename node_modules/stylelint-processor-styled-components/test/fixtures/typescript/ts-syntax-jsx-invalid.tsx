import * as React from 'react';
import styled from 'styled-components';

interface Props {
  header: React.ReactNode;
  body: React.ReactNode;
}
type SelectProps<T> = { items: T[] }
class Select<T> extends React.Component<SelectProps<T>, any> { }

class MyComponent extends React.Component<Props, {}> {
    render() {
        return <div>
            {this.props.header}
            {this.props.body}
        </div>;
    }
}

const DecoratedComp = styled(MyComponent)`
     border: 2px;
`;