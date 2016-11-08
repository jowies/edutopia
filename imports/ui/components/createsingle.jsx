import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { insert } from '../../api/sessions/methods.js';
import Input from '../components/input.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class CreateSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionname: '',
    };
    this.createSession = this.createSession.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
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

  handleChangeName(e) {
    e.preventDefault();
    const name = e.target.value;
    this.setState({ sessionname: name });
  }

  createSession(e) {
    e.preventDefault();
    insert.call({ single: true, roomId: '', sessionNameUser: this.state.sessionname }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        FlowRouter.go('/mysession/' + res);
      }
    });
  }

  render() {
    return (
      <div className="mdl-card mdl-shadow--4dp center" >
        <h5>Create single session</h5>
        <form onSubmit={this.createSession} >
          <Input
            value={this.state.sessionname}
            onChange={this.handleChangeName}
            id={'name'}
            label={'Please enter sessionname'}
            type={'text'}
            errormessage={''}
          />
          <button
            onClick={this.createSession}
            ref="button"
            className="mdl-button
              mdl-button--raised
              mdl-button--colored
              mdl-button--primary
              mdl-js-button
              mdl-js-ripple-effect"
          >
            Create
          </button>
        </form>
      </div>
    );
  }
}

CreateSingle.propTypes = {
  done: React.PropTypes.func,
  room: React.PropTypes.object,
};
