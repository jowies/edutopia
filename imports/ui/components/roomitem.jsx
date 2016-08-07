import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class RoomItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const route = '/dashboard/myrooms/';
    FlowRouter.go(route + this.props.room._id);
  }

  render() {
    return (
      <div>
        <li
          id={this.props.room._id}
          onClick={this.handleClick}
          className="mdl-list__item mdl-list__item--three-line listElement"
        >
          <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-avatar">person</i>
            <span>
              <p key={this.props.room._id}>{this.props.room.nickname}
                <span style={{ float: 'right' }} > &nbsp; created at: &nbsp;
                  <span>{this.props.room.createdAt.toDateString()}</span>
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
    );
  }
}

RoomItem.propTypes = {
  room: React.PropTypes.object,
};
