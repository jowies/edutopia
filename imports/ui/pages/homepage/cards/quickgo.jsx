import React from 'react';
import { Meteor } from 'meteor/meteor';
import { upgrade, downgrade } from '../../../helpers/upgrade.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class QuickGo extends React.Component {
  constructor(props) {
    super(props);

    this.goToDashboard = this.goToDashboard.bind(this);
    this.logOut = this.logOut.bind(this);
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

  goToDashboard(e) {
    e.preventDefault();
    FlowRouter.go('/dashboard/myrooms');
  }

  logOut(e) {
    e.preventDefault();
    Meteor.logout();
    FlowRouter.go('/');
    this.props.goBack();
  }

  render() {
    return (
      <div
        className="center
            mdl-card fixed-size mdl-shadow--2dp"
        style={{ width: '320px' }}
      >
        <div>
          <h5>You are already logged in</h5>
        </div>
        <div className="mdl-card__actions">
          <div className="center">
            <button
              onClick={this.goToDashboard}
              ref="login"
              className="mdl-button
                mdl-button--raised
                mdl-button--colored
                mdl-color--light-green-500
                mdl-color-text--light-green-50
                mdl-js-button
                mdl-js-ripple-effect"
              style={{ width: '100%' }}
            >
              Go to dashboard
            </button>
          </div>
        </div>
        <div className="mdl-card__actions">
          <div className="center">
            <button
              onClick={this.logOut}
              className="mdl-button
                mdl-button--primary
                mdl-button--raised
                mdl-js-button
                mdl-js-ripple-effect"
              ref="signup"
              style={{ width: '100%' }}
            >
             Log out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

QuickGo.propTypes = {
  goBack: React.PropTypes.func,
};
