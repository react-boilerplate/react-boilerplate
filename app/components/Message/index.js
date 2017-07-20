import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import {
  makeSelectMessageId,
  makeSelectMessageException,
  makeSelectMessageStakes,
} from './selectors';
import messages from './messages';

class Message extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log('Message::props:', this.props);
    // console.log('Message::messageId:', this.props.messageId);
    // console.log('Message::messages:', messages);
    // console.log('Message:', messages[this.props.messageId].id);

    return (
      <div>
        <FormattedMessage id={messages[this.props.messageId].id} />
      </div>
    );
  }
}

Message.propTypes = {
  messageId: React.PropTypes.string,
};

const mapDispatchToProps = () => Object.create(null);

const mapStateToProps = createStructuredSelector({
  messageId: makeSelectMessageId(),
  exception: makeSelectMessageException(),
  stakes: makeSelectMessageStakes(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
