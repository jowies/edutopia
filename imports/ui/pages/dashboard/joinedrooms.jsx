import React from 'react';

export default class JoinedRooms extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  handleClick(e) {
    // MÅ LEGGES INN ROUTING OG ENDRE på path
    e.preventDefault();
    const route = '/dashboard/myrooms/';
    FlowRouter.go(route + this.room._id);
  }

  renderList() {
    return this.props.rooms.map((room) => (
      <div>
        <li
          id={room._id}
          onClick={this.handleClick}
          className="mdl-list__item mdl-list__item--three-line listElement"
        >
          <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-avatar">person</i>
            <span>
              <p key={room._id}>{room.nickname}
                <span style={{ float: 'right' }} > &nbsp; created at: &nbsp;
                  <span>{room.createdAt.toDateString()}</span>
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

JoinedRooms.propTypes = {
  loading: React.PropTypes.bool,
  rooms: React.PropTypes.array,
};
