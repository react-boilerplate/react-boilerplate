import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { AboutContainer, ImageWrapper, Image, TextContainer, Text } from './styled';
import { selectAuthor } from '../../containers/App/selectors';
import createMessages from './messages';

const Author = ({ author }) => (
  <AboutContainer>
    <ImageWrapper>
      <Image src={author.imgSrc} />
    </ImageWrapper>
    <TextContainer>
      <Text>
        <FormattedMessage {...createMessages(author.about).author} />
      </Text>
    </TextContainer>
  </AboutContainer>
);

Author.propTypes = {
  author: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  author: selectAuthor(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(Author);
