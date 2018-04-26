import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { AboutContainer, ImageWrapper, Image, TextContainer, Text } from './styled';
import { selectAuthor } from '../../containers/App/selectors';

const About = ({ author }) => (
  <AboutContainer>
    <ImageWrapper>
      <Image src={author.imgSrc} />
    </ImageWrapper>
    <TextContainer>
      <Text>{author.about}</Text>
    </TextContainer>
  </AboutContainer>
);

About.propTypes = {
  author: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  author: selectAuthor(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(About);
