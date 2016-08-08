import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';
import SessionItem from '../../components/sessionitem.jsx';
import { insert } from '../../../api/sessions/methods.js';

export default class MyRoom extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.createSession = this.createSession.bind(this);
  }

  componentDidMount() {
    if (this.props.loading) {
      upgrade(this.refs.spinner);
    }
  }

  componentDidUpdate() {
    if (this.props.loading) {
      upgrade(this.refs.spinner);
    }
  }

  componentWillUnmount() {
    // RATHER USE if isUpgraded(this.resf.spinner)  #PS: need to make the method
    // the way it is now, can return in error!
    // e.g. if it upgrades because of load, then it should downgrade later
    // on, but this wont happen because it isn't loading anymore.
    // Løsbart enkelt ved å lage en loading component
    if (this.props.loading) {
      downgrade(this.refs.spinner);
    }
  }
  createSession(e) {
    e.preventDefault();
    const roomId = this.props.room._id;
    console.log(roomId);
    insert.call({ roomId }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  renderList() {
    return this.props.sessions.map((session) => (
      <SessionItem key={session._id} session={session} />
    ));
  }

  render() {
    return (
      <div>
        {this.props.room ? this.props.room.nickname : <p>Loading</p>}
        {this.props.loading ? <p>Loading sessions</p> : <ul className="mdl-list list"> {this.renderList()} </ul>}
        <div className="center">
          <button onClick={this.createSession} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
            <i className="material-icons">add</i>
          </button>
        </div>
      </div>
    );
  }
}

MyRoom.propTypes = {
  loading: React.PropTypes.bool,
  room: React.PropTypes.object,
  sessions: React.PropTypes.array,
  roomId: React.PropTypes.string,
};

