import React from 'react';
import { upgrade, downgrade } from '../../../helpers/upgrade.jsx';


export default class EnterLectureCard extends React.Component {

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
              className="
                mdl-card__subtitle-text"
              style={{ paddingTop: '10px', marginTop: '10px' }}
            >
              <h5>Go directly to a lecture</h5>
            </div>
          </div>
          <div className="mdl-card__actions">
            <form action="#">
              <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample2" />
                <label className="mdl-textfield__label" htmlFor="sample2">PIN...</label>
                <span className="mdl-textfield__error">Pin is not a number!</span>
              </div>
            </form>
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
             Enter
            </button>
          </div>
        </div>
      </div>
    );
  }
}
EnterLectureCard.propTypes = {
  goBack: React.PropTypes.func,
};
