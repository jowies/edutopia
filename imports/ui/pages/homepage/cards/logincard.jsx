import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { upgrade, downgrade } from '../../../helpers/upgrade.jsx';
import Input from '../../../components/input.jsx';

export default class LogInCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    upgrade(this.refs.goback, this.refs.login);
  }

  componentDidUpdate() {
    upgrade(this.refs.goback, this.refs.login);
  }

  componentWillUnmount() {
    downgrade(this.refs.goback, this.refs.login);
  }


  handleChangeUsername(e) {
    e.preventDefault();
    this.setState({ username: e.target.value, error: false });
  }

  handleChangePassword(e) {
    e.preventDefault();
    this.setState({ password: e.target.value, error: false });
  }

  logIn(e) {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        this.setState({ error: true });
      } else {
        FlowRouter.go('/dashboard/myrooms');
      }
    });
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
              <h1>Log in</h1>
            </div>
          </div>
          <div className="mdl-card__actions">
            <form onSubmit={this.logIn} >
              <Input
                value={this.state.username}
                onChange={this.handleChangeUsername}
                id={'user'}
                label={'Username or email'}
                type={'text'}
                errormessage={''}
                error={false}
              />
              <Input
                value={this.state.password}
                onChange={this.handleChangePassword}
                id={'password'}
                label={'Password'}
                type={'password'}
                errormessage={''}
                error={false}
              />
            </form>
            {this.state.error ? <p className="mdl-color-text--red-500">
              Wrong username/email or password
            </p> : <span></span>}
          </div>
          <div className="mdl-card__actions">
            <p><a href="/retrieval">Forgot your password?</a></p>
            <button
              onClick={this.props.goBack}
              ref="goback"
              className="mdl-button
                mdl-button--raised
                mdl-button--colored
                mdl-color--light-green-500
                mdl-color-text--light-green-50
                mdl-js-button
                mdl-js-ripple-effect"
              style={{ float: 'left' }}

            >
              Go back
            </button>
            <button
              onClick={this.logIn}
              className="mdl-button
                mdl-button--primary
                mdl-button--raised
                mdl-js-button
                mdl-js-ripple-effect"
              ref="login"
              style={{ float: 'right' }}
            >
             Log in
            </button>
          </div>
        </div>
      </div>
    );
  }
}
LogInCard.propTypes = {
  goBack: React.PropTypes.func,
};
