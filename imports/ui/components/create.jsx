import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { insert } from '../../api/rooms/methods.js';
import Input from '../components/input.jsx';

export default class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: '',
      roomcode: '',
      error: false,
    };
    this.createRoom = this.createRoom.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
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

  createRoom(e) {
    e.preventDefault();
    const roomname = this.state.roomname;
    const roomcode = this.state.roomcode;
    insert.call({ nickname: roomname, roomcode: roomname }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ error: !res });
      }
    });
  }

  handleChangeName(e) {
    e.preventDefault();
    const name = e.target.value;
    this.setState({ roomname: name });
  }

  handleChangeCode(e) {
    e.preventDefault();
    const code = e.target.value;
    this.setState({ roomcode: code });
  }

  render() {
    return (
      <div className="mdl-card mdl-shadow--4dp center" >
        <h6 style={{ textAlign: 'left' }}>Coursename can be anything, but it's recommended that you choose something relevant, such as the subject code.</h6>
        <form>
          <Input
            value={this.state.roomname}
            onChange={this.handleChangeName}
            id={'name'}
            label={'Please enter a coursename'}
            type={'text'}
            errormessage={''}
          />
          {/* <Input
            value={this.state.roomcode}
            onChange={this.handleChangeCode}
            id={'name'}
            label={'Please enter a code'}
            type={'text'}
            errormessage={''}
          /> */}
          <button
            onClick={this.createRoom}
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
          {this.state.error ? <p className="mdl-color-text--red-500">Course with name already exists</p> : <span></span>}
        </form>
      </div>
    );
  }
}

CreateRoom.propTypes = {
  done: React.PropTypes.func,
};
