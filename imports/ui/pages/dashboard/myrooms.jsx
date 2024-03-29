import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';
import RoomItem from '../../components/roomitem.jsx';
import { Meteor } from 'meteor/meteor';
import CreateRoom from '../../components/create.jsx';

export default class MyRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
    this.renderList = this.renderList.bind(this);
    this.expandhandle = this.expandhandle.bind(this);
    this.done = this.done.bind(this);
  }

  componentDidMount() {
    upgrade(this.refs.create);
  }

  componentDidUpdate() {
    upgrade(this.refs.create);
  }

  componentWillUnmount() {
    // RATHER USE if isUpgraded(this.resf.spinner)  #PS: need to make the method
    // the way it is now, can return in error!
    // e.g. if it upgrades because of load, then it should downgrade later
    // on, but this wont happen because it isn't loading anymore.

    downgrade(this.refs.create);
  }


  getSign() {
    if (this.state.expand) {
      return '-';
    }
    return '+';
  }

  done() {
    this.setState({ expand: false });
  }

  expandhandle(e) {
    e.preventDefault();
    this.setState({ expand: !this.state.expand });
  }

  expand() {
    if (this.state.expand && !this.props.loading) {
      return <CreateRoom done={this.done} />;
    }
    return null;
  }

  renderList() {
    return this.props.rooms.map((room) => (
      <RoomItem room={room} key={room._id} />
    ));
  }

  render() {
    return (
      <div>
        <div className="center">
          <button ref="create" onClick={this.expandhandle} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
            {this.getSign()} Create new course
          </button>
          {this.expand()}
        </div>
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
