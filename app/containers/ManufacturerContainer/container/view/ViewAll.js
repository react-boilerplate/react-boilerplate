import React from 'react';
import { Card } from 'semantic-ui-react';
import Img from 'components/Img';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import reducer from '../../reducer';
import saga from '../../saga';
import { getAllManufacturers } from '../../actions';
import { makeSelectAllManufacturers } from '../../selectors';

const CardView = props => (
  <Card color={props.color}>
    <Card.Content>
      <Img floated="right" size="mini" src={props.imageSrc} alt="image" />
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
  color: PropTypes.string,
};

const Wrapper = styled.div`
  margin-top: 3em;
  margin-bottom: 3em;
`;

export class ViewAllManufacturer extends React.Component {
  src = '/favicon.ico';

  componentDidMount() {
    this.props.fetchAllManufacturers();
  }

  render() {
    return (
      <Wrapper>
        <Card.Group itemsPerRow={6}>
          {this.props.manufacturersList &&
            this.props.manufacturersList.map(item => (
              <CardView
                key={item.id}
                color={item.color}
                id={item.id}
                imageSrc={this.src}
                title={item.displayName}
                subTitle="Safari Industries Limited"
                description="Safari Industries private limited"
              />
            ))}
        </Card.Group>
      </Wrapper>
    );
  }
}

ViewAllManufacturer.propTypes = {
  fetchAllManufacturers: PropTypes.func,
  manufacturersList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  manufacturersList: makeSelectAllManufacturers(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchAllManufacturers: () => dispatch(getAllManufacturers()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'manufacturer', reducer });
const withSaga = injectSaga({ key: 'manufacturer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ViewAllManufacturer);
