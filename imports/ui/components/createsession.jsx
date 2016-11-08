import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { insert } from '../../api/sessions/methods.js';
import Input from '../components/input.jsx';

export default class CreateSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: '',
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
    this.setState({ roomname: name });
  }

  createSession(e) {
    e.preventDefault();
    const roomId = this.props.room._id;
    const par = { single: false, roomId };
    if (this.state.roomname.length > 0) {
      par.sessionNameUser = this.state.roomname;
    }
    console.log(roomId);
    insert.call(par, (err) => {
      if (err) {
        console.log(err);
      } else{
        this.props.done();
      }
    });
  }

  render() {
    return (
      <div className="mdl-card mdl-shadow--4dp center" >
        <form onSubmit={this.createSession} >
          <Input
            value={this.state.roomname}
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
            Start
          </button>
        </form>
      </div>
    );
  }
}

CreateSession.propTypes = {
  done: React.PropTypes.func,
  room: React.PropTypes.object,
};
