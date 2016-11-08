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
      emailNotValid: false,
      passwordError: false,
      passwordRepErrors: false,
      checked: false,
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordRep = this.handleChangePasswordRep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
  }

  componentDidMount() {
    upgrade(this.refs.submit, this.refs.checkbox, this.refs.back);
  }

  componentDidUpdate() {
    upgrade(this.refs.submit, this.refs.checkbox, this.refs.back);
  }

  componentWillUnmount() {
    downgrade(this.refs.submit, this.refs.checkbox, this.refs.back);
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
        if (res || (username.length < 6 && username.length > 0)) {
          this.setState({ usernameError: true });
          this.isReady(undefined, true, undefined);
        } else {
          this.setState({ usernameError: false });
          this.isReady(undefined, false, undefined);
        }
      }
    });
    if (username.length < 1) {
      this.isReady(undefined, true, undefined);
      this.setState({ usernameError: false });
    }
  }

  handleChangeEmail(e) {
    e.preventDefault();
    const email = e.target.value;
    this.setState({ email });
    const re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const isValid = re.test(email);
    if (isValid) {
      this.setState({ emailNotValid: false });
      isUserEmail.call({ email }, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({ alreadyUserEmail: res });
          this.setState({ emailError: res });
          this.isReady(res, undefined, undefined);
        }
      });
    } else {
      this.setState({ emailError: true });
      this.setState({ emailNotValid: true });
      this.isReady(true, undefined, undefined);
    }
    if (email.length < 1) {
      this.setState({ emailError: false });
    }
  }

  handleChangePassword(e) {
    e.preventDefault();
    const password = e.target.value;
    if (password.length > 0 && password.length < 6) {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }
    this.setState({ password, passwordRep: '' });
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

  handleChangeCheckbox(e) {
    console.log(e.target.checked);
    this.setState({ checked: e.target.checked });
    this.isReady(undefined, undefined, undefined, e.target.checked);
  }

  isReady(email = this.state.emailError,
    username = this.state.usernameError,
    password = this.state.passwordMatches, checked = this.state.checked) {
    let ready = !(email ||
      username ||
      !password || !true);
    if (this.state.email.length < 1 || this.state.username.length < 1) {
      ready = false;
    }
    this.setState({ ready });
    console.log(ready);
  }

  handleSubmit(e) {
    e.preventDefault();
    Accounts.createUser({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      subscribed: this.state.checked,
    }, (err, callback) => {
      if (err) {
        console.log(err);
      } else {
        FlowRouter.go('/dashboard/myrooms');
      }
    });
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

  emailError() {
    let message = '';
    if (this.state.alreadyEmail) {
      message += 'Email already signed up';
    }
    if (this.state.emailNotValid && (this.state.email.length > 0)) {
      message += 'Please enter a valid email';
    }
    return message;
  }

  passwordError() {
    let message = '';
    if (this.state.password.length < 6) {
      message += 'Password has to be at least 6 characters long';
    }
    if (this.state.password.length > 23) {
      message += 'Password cannot exceed 24 characters';
    }
    return message;
  }

  goBack() {
    FlowRouter.go('/');
  }

  render() {
    return (
      <div className="signup">
        <div className="mdl-card mdl-shadow--4dp center" style={{ maxWidth: '100%', marginTop: '2em' }} >
          <div className="mdl-card__title mdl-card--expand mdl-color--light-green-900">
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
              errormessage={this.emailError()}
              error={this.state.emailError}
            />
            <Input
              value={this.state.password}
              onChange={this.handleChangePassword}
              id={'password'}
              label={'Password'}
              type={'password'}
              error={this.state.passwordError}
              errormessage={this.passwordError()}
            />
            <Input
              value={this.state.passwordRep}
              onChange={this.handleChangePasswordRep}
              id={'passwordrep'}
              label={'Repeat password'}
              type={'password'}

            />
            <div className="mdl-card__actions">
              <label
                className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"
                htmlFor="checkbox-1" ref="checkbox"
              >
                <input
                  type="checkbox"
                  id="checkbox-1"
                  className="mdl-checkbox__input"
                  style={{ float: 'left' }}
                  onChange={this.handleChangeCheckbox}
                  checked={this.state.checked}
                />
                <span className="mdl-checkbox__label" style={{ float: 'left', paddingLeft: '3px' }}>
                  <p style={{ marginBottom: 20 }}>I agree to edutopia sending an occational email requesting feedback &nbsp;
                  </p>
                </span>
              </label>
            </div>
          </form>
          <div style={{ marginTop: 20 }} className="mdl-card__actions">
            <button
              onClick={this.goBack}
              ref="back"
              className="mdl-button
                mdl-button--raised
                mdl-button--colored
                mdl-button--primary
                mdl-js-button
                mdl-js-ripple-effect"
              style={{ float: 'left' }}
            >
              Go back
            </button>
            <button
              onClick={this.handleSubmit}
              ref="submit"
              type="submit"
              className={this.getButtonClass()}
              disabled={!this.state.ready}
              style={{ float: 'right' }}

            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
};
