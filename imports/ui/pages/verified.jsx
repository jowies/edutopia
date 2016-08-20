import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';

export default class Verified extends React.Component {
  constructor(props) {
    super(props);
    this.goToDashboard = this.goToDashboard.bind(this);
  }


  componentDidMount() {
    upgrade(this.refs.submit);
  }

  componentDidUpdate() {
    upgrade(this.refs.submit);
  }

  componentWillUnmount() {
    downgrade(this.refs.submit);
  }

  goToDashboard(e) {
    e.preventDefault();
    FlowRouter.go('/dashboard');
  }

  render() {
    return (
      <div className="signup">
        <div className="mdl-card mdl-shadow--4dp center" style={{ maxWidth: '100%', marginTop: '2em' }} >
          <div className="mdl-card__title mdl-card--expand mdl-color--light-green-900">
            <h2
              className="mdl-card__title-text
                mdl-color-text--light-green-50"
            >Thank you for verifying your email address</h2>
          </div>
          <button
            onClick={this.goToDashboard}
            ref="submit"
            type="submit"
            className="mdl-button
                mdl-button--raised
                mdl-button--colored
                mdl-button--primary
                mdl-js-button
                mdl-js-ripple-effect"
          >
            Go to dashboard
          </button>
        </div>
      </div>
    );
  }
}

Verified.propTypes = {
};
