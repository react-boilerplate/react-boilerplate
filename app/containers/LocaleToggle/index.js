/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectLocale } from '../LanguageProvider/selectors';
import { changeLocale } from '../LanguageProvider/actions';
import { createStructuredSelector } from 'reselect';
import styles from './styles.css';
import messages from './messages';
import Toggle from 'components/Toggle';
export class LocaleToggle extends React.Component {
  static propTypes = {
    changeLocale: React.PropTypes.func,
  }

  handleToggle = (evt) => {
    this.props.changeLocale(evt.target.value);
  }

  render() {
    return (
      <div className={styles.localeToggle}>
        <Toggle
          values={['en', 'de']}
          messages={messages}
          onToggle={this.handleToggle}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({ locale: selectLocale() });
const mapActionCreators = { changeLocale };

export default connect(mapStateToProps, mapActionCreators)(LocaleToggle);
