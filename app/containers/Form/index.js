import React, { Component } from 'react';
// connect it to the store

import Form from '../../components/Form';
import Wrapper from '../../components/UI/Wrapper';
import Input from '../../components/Input';
import Button from '../../components/UI/Button';

class AddItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    // const item = this.state.input;
    this.setState({ input: '' });
  }

  onChange(e) {
    const input = e.target.value;
    this.setState({ input });
  }

  render() {
    return (
      <Wrapper>
        <Form onSubmit={e => this.onSubmit(e)}>
          <Input
            inputType="text"
            label="Add item"
            labelColor="grey"
            onChange={this.onChange}
            value={this.state.input}
          />
          <Button type="submit" onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
      </Wrapper>
    );
  }
}

export default AddItemForm;
