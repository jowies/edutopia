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

  renderList() {
    return (
      <div>
        <li
          className="mdl-list__item mdl-list__item--three-line listElement"
        >
          <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-avatar">question</i>
            <span>
              <p> Oppdiktet navn </p>
            </span>
          </span>
          <span className="mdl-list__item-secondary-content">
            <h5>Here is the question coming</h5>
          </span>
        </li>
        <li
          className="mdl-list__item mdl-list__item--three-line listElement"
        >
          <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-avatar">question</i>
            <span>
              <p> Oppdiktet navn </p>
            </span>
          </span>
          <span className="mdl-list__item-secondary-content">
            <h5>Here is the question coming</h5>
          </span>
        </li>
        <li
          className="mdl-list__item mdl-list__item--three-line listElement"
        >
          <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-avatar">question</i>
            <span>
              <p> Oppdiktet navn </p>
            </span>
          </span>
          <span className="mdl-list__item-secondary-content">
            <h5>Here is the question coming</h5>
          </span>
        </li>
      </div>
    );
  }

  render() {
    return (
      <div>
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