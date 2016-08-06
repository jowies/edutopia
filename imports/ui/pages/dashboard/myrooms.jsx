import React from 'react';
import Button from '../../components/button.jsx';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';

export default class MyRooms extends React.Component {
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
    FlowRouter.go('/dashboard/myrooms/' + event.currentTarget.id);
  }


  renderList() {
    return this.props.rooms.map((room) => (
      <div>
        <li
          id={room._id}
          onClick={this.routeToSessions}
          className="mdl-list__item mdl-list__item--three-line listElement"
        >
          <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-avatar">person</i>
            <span>
              <p key={room._id}>{room.nickname}
                <span style={{ float: 'right' }} > &nbsp; created at: &nbsp;
                  <span>{room.createdAt.toString()}</span>
                </span>
              </p>
            </span>
            <span className="mdl-list__item-text-body">
              Short summary of what the Room/(course) is about.
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
      {this.props.loading ?
        <div
          className="mdl-spinner
          mdl-spinner--single-color mdl-js-spinner is-active"
          ref="spinner"
        >
        </div> : <ul className="mdl-list list"> {this.renderList()} </ul>}
      </div>
    );
  }
}

MyRooms.propTypes = {
  loading: React.PropTypes.bool,
  rooms: React.PropTypes.array,
};
