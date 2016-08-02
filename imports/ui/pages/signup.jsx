import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import Input from '../components/input.jsx';
import { isUserUsername, isUserEmail } from '../../api/accounts/methods.js';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordRep: '',
      alreadyUserUsername: false,
      alreadyUserEmail: false,
      passwordMatches: false,
      isStudent: '',
      isProfessor: '',
      ready: false,
      usernameError: false,
      emailError: false,
      passwordError: false,
      passwordRepErrors: false,
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordRep = this.handleChangePasswordRep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  getButtonClass() {
    const className1 = 'mdl-button mdl-button--raised mdl-button--colored';
    const className2 = ' mdl-js-button mdl-js-ripple-effect';
    const color = ' mdl-color--light-green-900 mdl-color-text--light-green-50';
    if (this.state.ready) {
      return className1 + className2 + color;
    }
    return className1 + className2;
  }

  handleChangeUsername(e) {
    e.preventDefault();
    const username = e.target.value;
    this.setState({ username });
    isUserUsername.call({ username }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ alreadyUserUsername: res });
        this.isReady(undefined, res, undefined);
        if (res || (username.length < 6 && username.length > 0)) {
          this.setState({ usernameError: true });
        } else {
          this.setState({ usernameError: false});
        }
      }
    });
  }

  handleChangeEmail(e) {
    e.preventDefault();
    const email = e.target.value;
    this.setState({ email });
    isUserEmail.call({ email }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ alreadyUserEmail: res });
        this.isReady(err, undefined, undefined);
      }
    });
  }

  handleChangePassword(e) {
    e.preventDefault();
    this.setState({ password: e.target.value, passwordRep: '' });
    this.isReady(undefined, undefined, false);
  }

  handleChangePasswordRep(e) {
    e.preventDefault();
    const passwordRep = e.target.value;
    this.setState({ passwordRep });
    const passwordMatches = this.state.password === passwordRep;
    if (passwordMatches) {
      this.setState({ passwordMatches });
    } else {
      this.setState({ passwordMatches });
    }
    this.isReady(undefined, undefined, passwordMatches);
  }

  isReady(email = this.state.alreadyUserEmail,
    username = this.state.alreadyUserUsername,
    password = this.state.passwordMatches) {
    const ready = !(email ||
      username ||
      !password);
    this.setState({ ready });
    console.log(ready);
  }

  handleSubmit(e) {
    e.preventDefault();
    Accounts.createUser({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }, function(err, callback) {});
    FlowRouter.go('/dashboard');
  }

  usernameError() {
    let message = '';
    if (this.state.alreadyUserUsername) {
      message += 'Username taken';
    }
    if (this.state.username.length < 6) {
      message += 'Username has to be at least 6 characters';
    }
    return message;
  }

  render() {
    return (
      <div className="signup">
        <div className="mdl-card mdl-shadow--4dp center" style={{ maxWidth: '100%' }} >
          <div className="mdl-card__title mdl-color--light-green-900">
            <h2
              className="mdl-card__title-text
                mdl-color-text--light-green-50"
            >Sign Up for Edutopia</h2>
          </div>
          <form>
            <Input
              value={this.state.username}
              onChange={this.handleChangeUsername}
              id={'user'}
              label={'Username'}
              type={'text'}
              errormessage={this.usernameError()}
              error={this.state.usernameError}
            />
            <Input
              value={this.state.email}
              onChange={this.handleChangeEmail}
              id={'email'}
              label={'Email'}
              type={'email'}
            />
            <Input
              value={this.state.password}
              onChange={this.handleChangePassword}
              id={'password'}
              label={'Password'}
              type={'password'}
            />
            <Input
              value={this.state.passwordRep}
              onChange={this.handleChangePasswordRep}
              id={'passwordrep'}
              label={'Repeat password'}
              type={'password'}
            />
            <div className="mdl-card__actions">
              <button
                onClick={this.handleSubmit}
                ref="submit"
                type="submit"
                className={this.getButtonClass()}
                disabled={!this.state.ready}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
};
