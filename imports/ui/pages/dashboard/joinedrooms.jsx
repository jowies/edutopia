import React from 'react';
import JoinedRoomItem from '../../components/joinedroomitem.jsx';
import JoinRoom from '../../components/joinroom.jsx';

export default class JoinedRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extend: false,
    };
    this.renderList = this.renderList.bind(this);
    this.expandhandle = this.expandhandle.bind(this);
    this.done = this.done.bind(this);
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
      return <JoinRoom done={this.done} />;
    }
    return null;
  }

  renderList() {
    return this.props.rooms.map((room) => (
      <JoinedRoomItem room={room} key={room._id} />
    ));
  }

  render() {
    return (
      <div>
        <div className="center">
          <button ref="create" onClick={this.expandhandle} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
            {this.getSign()} Join new course
          </button>
          {this.expand()}
        </div>
      {this.props.loading ?
        <div
          className="mdl-spinner
          mdl-spinner--single-color mdl-js-spinner is-active"
        >
        </div> : <ul className="mdl-list list"> {this.renderList()} </ul>}
      </div>
    );
  }
}

JoinedRooms.propTypes = {
  loading: React.PropTypes.bool,
  rooms: React.PropTypes.array,
};
