import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.signUp = this.signUp.bind(this);
  }

  componentDidMount() {
    upgrade(this.refs.signup, this.refs.login);
  }

  componentDidUpdate() {
    upgrade(this.refs.signup, this.refs.login);
  }

  componentWillUnmount() {
    downgrade(this.refs.signup, this.refs.login);
  }

  signUp() {
    FlowRouter.go('/signup');
  }

  render() {
    return (
      <div className="home center">
        <div
          className="
            demo-card-square
            mdl-card mdl-shadow--2dp center card"
          style={{ maxWidth: '100%' }}
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
                onClick={this.signUp}
                ref="signup"
                className="mdl-button
                  mdl-button--raised
                  mdl-button--colored
                  mdl-color--light-green-500
                  mdl-color-text--light-green-50
                  mdl-js-button
                  mdl-js-ripple-effect"

              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="mdl-card__supporting-text">
            or
          </div>
          <div className="mdl-card__actions">
            <div className="center">
              <button
                onClick={this.logIn}
                className="mdl-button
                  mdl-button--primary
                  mdl-button--raised
                  mdl-js-button
                  mdl-js-ripple-effect"
                ref="login"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
