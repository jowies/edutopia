import React from 'react';
import { upgrade, downgrade } from '../../../helpers/upgrade.jsx';


export default class SignUpCard extends React.Component {
  componentDidMount() {
    upgrade(
      this.refs.signup,
      this.refs.login,
      this.refs.textfield1,
      this.refs.textfield2,
      this.refs.textfield3,
      this.refs.checkbox
    );
  }

  componentDidUpdate() {
    upgrade(
      this.refs.signup,
      this.refs.login,
      this.refs.textfield1,
      this.refs.textfield2,
      this.refs.textfield3,
      this.refs.checkbox
    );
  }

  componentWillUnmount() {
    downgrade(
      this.refs.signup,
      this.refs.login,
      this.refs.textfield1,
      this.refs.textfield2,
      this.refs.textfield3,
      this.refs.checkbox
    );
  }

  render() {
    return (
      <div>
        <div
          className="center
            demo-card-square
            mdl-card mdl-shadow--2dp"
        >
          <div className="mdl-card__title mdl-card--expand">
            <div
              className="center
                mdl-card__subtitle-text"
              style={{ paddingTop: '10px', marginTop: '10px' }}
            >
              <h1>Sign Up</h1>
            </div>
          </div>
          <div className="mdl-card__actions">
            <form action="#">
              <div className="mdl-textfield mdl-js-textfield" ref="textfield1">
                <input className="mdl-textfield__input" type="text" id="sample1" />
                <label className="mdl-textfield__label" htmlFor="sample1">Email...</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield" ref="textfield2">
                <input className="mdl-textfield__input" type="text" id="sample1" />
                <label className="mdl-textfield__label" htmlFor="sample1">Password...</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield" ref="textfield3">
                <input className="mdl-textfield__input" type="text" id="sample1" />
                <label className="mdl-textfield__label" htmlFor="sample1">Confirm Password...</label>
              </div>
            </form>
          </div>
          <div className="mdl-card__actions">
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-1" ref="checkbox">
              <input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" style={{ float: 'left' }} />
              <span className="mdl-checkbox__label" style={{ float: 'left', paddingLeft: '3px' }}>
                <p>I agree to the &nbsp;
                  <span>
                    <a href="#">terms and conditions</a>
                  </span>
                </p>
              </span>
            </label>
          </div>
          <div className="mdl-card__actions">
            <button
              onClick={this.props.goBack}
              ref="signup"
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
              className="mdl-button
                mdl-button--primary
                mdl-button--raised
                mdl-js-button
                mdl-js-ripple-effect"
              ref="login"
              style={{ float: 'right' }}
            >
             Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
}
SignUpCard.propTypes = {
  goBack: React.PropTypes.func,
};
