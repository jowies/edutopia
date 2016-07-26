import React from 'react';

export default class JoinedRooms extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    return this.props.rooms.map((room) => (
      <p key={room._id}>{room.nickname}</p>
    ));
  }

  render() {
    return (
      <div>
      {this.props.loading ?
        <div
          className="mdl-spinner
          mdl-spinner--single-color mdl-js-spinner is-active"
        >
        </div> : this.renderList()}
      </div>
    );
  }
}

JoinedRooms.propTypes = {
  loading: React.PropTypes.bool,
  rooms: React.PropTypes.array,
};
