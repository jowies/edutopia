import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';

export default class MyRoom extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.routeToSessions = this.routeToSessions.bind(this);
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
    if (this.props.loading) {
      downgrade(this.refs.spinner);
    }
  }

  routeToSessions(event) {
    FlowRouter.go('/dashboard/myrooms/', this.props.roomId, '/', event.currentTarget.id);
  }

  renderList() {
    return this.props.sessions.map((session) => (
      <div>
        <li
          id={session._id}
          onClick={this.routeToSessions}
          className="mdl-list__item mdl-list__item--three-line listElement"
        >
          <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-avatar">school</i>
            <span>
              <p key={session._id}>{session.sessionName}
                <span style={{ float: 'right' }} > &nbsp; created at: &nbsp;
                  <span>{session.createdAt.toString()}</span>
                </span>
              </p>
            </span>
            <span className="mdl-list__item-text-body">
              Short summary of what the session is about.
              E.g. what chapter, or a short summary of the lecture.
            </span>
          </span>
          <span className="mdl-list__item-secondary-content">
            <a className="mdl-list__item-secondary-action" href="#">
              <i className="material-icons">star</i>
            </a>
          </span>
        </li>
      </div>
    ));
  }

  render() {
    return (
      <div>
        {this.props.room ? this.props.room.nickname : <p>Loading</p>}
        {this.props.loading ? <p>Loading sessions</p> : <ul className="mdl-list list"> {this.renderList()} </ul>}
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
