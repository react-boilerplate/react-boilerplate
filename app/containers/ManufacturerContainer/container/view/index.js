import React from 'react';
import { Card } from 'semantic-ui-react';
import Img from 'components/Img';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardView = props => (
  <Card>
    <Card.Content>
      <Img floated="right" size="mini" src={props.imageSrc} />
      <Card.Header>{props.title}</Card.Header>
      <Card.Meta>{props.subTitle}</Card.Meta>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
  </Card>
);

CardView.propTypes = {
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
};

const Wrapper = styled.div`
  margin-top: 3em;
  margin-bottom: 3em;
`;

export default class ViewAllManufacturer extends React.Component {
  src = '/favicon.ico';

  render() {
    return (
      <Wrapper>
        <Card.Group itemsPerRow={5}>
          <CardView
            imageSrc={this.src}
            title="Safari"
            subTitle="Safari Industries Limited"
            description="Safari Industries private limited"
          />
          <CardView
            imageSrc={this.src}
            title="VIP"
            subTitle="VIP Industries Limited"
            description="VIP Industries private limited"
          />
        </Card.Group>
      </Wrapper>
    );
  }
}
