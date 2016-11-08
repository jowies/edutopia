import React from 'react';
import { Meteor } from 'meteor/meteor';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { join } from '../../api/sessions/methods.js';
import Input from '../components/input.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class JoinSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessioncode: '',
    };
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.joinSession = this.joinSession.bind(this);
  }

  componentDidMount() {
    upgrade(this.refs.button);
  }

  componentDidUpdate() {
    upgrade(this.refs.button);
  }

  componentWillUnmount() {
    // RATHER USE if isUpgraded(this.resf.spinner)  #PS: need to make the method
    // the way it is now, can return in error!
    // e.g. if it upgrades because of load, then it should downgrade later
    // on, but this wont happen because it isn't loading anymore.
    // Løsbart enkelt ved å lage en loading component
    downgrade(this.refs.button);
  }

  handleChangeCode(e) {
    e.preventDefault();
    const code = e.target.value;
    this.setState({ sessioncode: code });
  }

  joinSession(e) {
    e.preventDefault();
    const par = {};
    if (this.state.sessioncode.length > 0) {
      par.sessionCode = this.state.sessioncode;
      par.user = Meteor.userId() || Session.get('client');
    }
    console.log(par.roomcode);

    join.call(par, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        FlowRouter.go('/joinedsession/' + res.session._id);
      }
    });
  }

  render() {
    return (
      <div className="mdl-card mdl-shadow--4dp center" >
        <h5>Join single session:</h5>
        <form onSubmit={this.createSession} >
          <Input
            value={this.state.sessioncode}
            onChange={this.handleChangeCode}
            id={'code'}
            label={'Please enter session code'}
            type={'text'}
            errormessage={''}
          />
          <button
            onClick={this.joinSession}
            ref="button"
            className="mdl-button
              mdl-button--raised
              mdl-button--colored
              mdl-button--primary
              mdl-js-button
              mdl-js-ripple-effect"
          >
            Join
          </button>
        </form>
      </div>
    );
  }
}

JoinSingle.propTypes = {
  done: React.PropTypes.func,
};
