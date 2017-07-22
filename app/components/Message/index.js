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
    // console.log('Message::props:', this.props);
    // console.log('Message::messageId:', this.props.messageId);
    // console.log('Message::exception:', this.props.exception);
    console.log('Message::stakes:', this.props.stakes, typeof this.props.stakes);
    console.log(`messages[${this.props.messageId}].id:`, messages[this.props.messageId].id);

    switch (this.props.stakes) {
      case this.props.stakes === 0:
        return (
          <div>
            <FormattedMessage id={messages[this.props.messageId].id} values={{ stakes: 'no' }} />
          </div>
        );
      case this.props.stakes > 0:
        return (
          <div>
            <FormattedMessage id={messages[this.props.messageId].id} values={{ stakes: this.props.stakes }} />
          </div>
        );
      default:
        return (
          <div>
            <FormattedMessage id={messages[this.props.messageId].id} />
          </div>
        );
    }
  }
}

Message.propTypes = {
  messageId: React.PropTypes.string,
  // exception: React.PropTypes.string,
  stakes: React.PropTypes.number,
};

// const mapDispatchToProps = () => Object.create(null);

const mapStateToProps = createStructuredSelector({
  messageId: makeSelectMessageId(),
  exception: makeSelectMessageException(),
  stakes: makeSelectMessageStakes(),
});

export default connect(mapStateToProps, null /* mapDispatchToProps */)(Message);
