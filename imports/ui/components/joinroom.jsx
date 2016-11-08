import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { join } from '../../api/rooms/methods.js';
import Input from '../components/input.jsx';

export default class JoinRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomcode: '',
    };
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
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
    this.setState({ roomcode: code });
  }

  joinRoom(e) {
    e.preventDefault();
    const par = {};
    if (this.state.roomcode.length > 0) {
      par.roomcode = this.state.roomcode;
    }
    console.log(par.roomcode);

    join.call(par, (err) => {
      if (err) {
        console.log(err);
      } else {
        this.props.done();
      }
    });
  }

  render() {
    return (
      <div className="mdl-card mdl-shadow--4dp center" >
        <form onSubmit={this.createSession} >
          <Input
            value={this.state.roomcode}
            onChange={this.handleChangeCode}
            id={'code'}
            label={'Please enter course code'}
            type={'text'}
            errormessage={''}
          />
          <button
            onClick={this.joinRoom}
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

JoinRoom.propTypes = {
  done: React.PropTypes.func,
};
