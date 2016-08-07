import React from 'react';
import Meteor from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router'
import { upgrade, downgrade } from '../../../helpers/upgrade.jsx';


export default class LogInCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    upgrade(this.refs.goback, this.refs.login, this.refs.textfield1, this.refs.textfield2);
  }

  componentDidUpdate() {
    upgrade(this.refs.goback, this.refs.login, this.refs.textfield1, this.refs.textfield2);
  }

  componentWillUnmount() {
    downgrade(this.refs.goback, this.refs.login, this.refs.textfield1, this.refs.textfield2);
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
              <div className="mdl-textfield mdl-js-textfield" ref="textfield1">
                <input className="mdl-textfield__input" type="text" id="sample1" />
                <label className="mdl-textfield__label" htmlFor="sample1">Email...</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield" ref="textfield2">
                <input className="mdl-textfield__input" type="text" id="sample1" />
                <label className="mdl-textfield__label" htmlFor="sample1">Password...</label>
              </div>
            </form>
          </div>
          <div className="mdl-card__actions">
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
