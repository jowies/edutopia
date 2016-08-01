import React from 'react';
import { upgrade, downgrade } from '../../../helpers/upgrade.jsx';


export default class EntryCard extends React.Component {

  componentDidMount() {
    upgrade(this.refs.signup, this.refs.login);
  }

  componentDidUpdate() {
    upgrade(this.refs.signup, this.refs.login);
  }

  componentWillUnmount() {
    downgrade(this.refs.signup, this.refs.login);
  }

  render() {
    return (
      <div>
        <div
          className="center
            demo-card-square
            mdl-card fixed-size mdl-shadow--2dp"
          style={{ width: '320px' }}
        >
          <div className="mdl-card__title mdl-card--expand">
            <div
              className="center
                mdl-card__subtitle-text"
              style={{ paddingTop: '10px', marginTop: '10px' }}
            >
              <h1>Edutopia</h1>
            </div>
          </div>
          <div className="mdl-card__actions">
            <div className="center">
              <button
                onClick={this.props.showEnterLectureCard}
                ref="signup"
                className="mdl-button
                  mdl-button--raised
                  mdl-button--colored
                  mdl-color--light-green-500
                  mdl-color-text--light-green-50
                  mdl-js-button
                  mdl-js-ripple-effect"
                style={{ width: '100%' }}

              >
                Enter Lecture
              </button>
            </div>
          </div>
          <div className="mdl-card__actions">
            <div className="center">
              <button
                onClick={this.props.showLogInCard}
                ref="signup"
                className="mdl-button
                  mdl-button--raised
                  mdl-button--colored
                  mdl-color--light-green-500
                  mdl-color-text--light-green-50
                  mdl-js-button
                  mdl-js-ripple-effect"
                style={{ width: '100%' }}
              >
                Log in
              </button>
            </div>
          </div>
          <div className="mdl-card__actions">
            <div className="center">
              <button
                onClick={this.props.showSignUpCard}
                className="mdl-button
                  mdl-button--primary
                  mdl-button--raised
                  mdl-js-button
                  mdl-js-ripple-effect"
                ref="login"
                style={{ width: '100%' }}
              >
               Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EntryCard.propTypes = {
  showEnterLectureCard: React.PropTypes.func,
  showSignUpCard: React.PropTypes.func,
  showLogInCard: React.PropTypes.func,
};

