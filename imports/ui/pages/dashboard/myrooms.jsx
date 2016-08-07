import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';
import RoomItem from '../../components/roomitem.jsx';
import { Meteor } from 'meteor/meteor';

export default class MyRooms extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
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
  createRoom() {
    const user = Meteor.userId();
    // rooms.insert(user);
  }


  renderList() {
    return this.props.rooms.map((room) => (
      <RoomItem room={room} key={room._id} />
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
        <div className="center">
          <button onClick={this.createRoom} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
            <i className="material-icons">add</i>
          </button>
        </div>
      </div>
    );
  }
}

MyRooms.propTypes = {
  loading: React.PropTypes.bool,
  rooms: React.PropTypes.array,
};
