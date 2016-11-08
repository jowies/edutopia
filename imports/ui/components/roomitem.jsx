import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { remove } from '../../../imports/api/rooms/methods.js';

export default class RoomItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { delete: false };
    this.handleClick = this.handleClick.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick(e) {
    if (!this.state.delete) {
      e.preventDefault();
      const route = '/dashboard/myrooms/';
      FlowRouter.go(route + this.props.room._id);
    }
  }

  handleDelete(e) {
    e.preventDefault();
    remove.call(({ roomId: this.props.room._id }), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  deleteQuestion(e) {
    e.preventDefault();
    this.setState({ delete: true });
  }

  handleNo(e) {
    e.preventDefault();
    this.setState({ delete: false });
  }

  renderQuestion() {
    return (
      <div>
        <li
          className="mdl-list__item mdl-list__item--three-line listElement"
        >
          <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-avatar">person</i>
            <p>Are you sure you want to delete {this.props.room.nickname}?</p>
          </span>
          <button
            onClick={this.handleDelete}
            ref="button"
            className="mdl-button
              mdl-button--raised
              mdl-button--colored
              mdl-color--red-A700
              mdl-js-button
              mdl-js-ripple-effect"
          >
          Yes
          </button>
          <button
            onClick={this.handleNo}
            ref="button"
            className="mdl-button
              mdl-button--raised
              mdl-button--colored
              mdl-button--primary
              mdl-js-button
              mdl-js-ripple-effect"
          >
          No
          </button>
        </li>
      </div>
      );
  }

  renderRoom() {
    return (
      <div style={{ position: 'relative' }}>
        <li
          className="mdl-list__item mdl-list__item--three-line listElement"
        >
          <span className="mdl-list__item-primary-content">
            <span>
              <h4 key={this.props.room._id}>{this.props.room.nickname}
              </h4>
            </span>
            <p><span style={{ fontWeight: 'bold' }}>Roomcode: </span>{this.props.room ? this.props.room.roomcode : ''}</p>
            <p><span style={{ fontWeight: 'bold' }}>Created: </span>{this.props.room.createdAt.toDateString()}</p>
          </span>
          <div style={{ float: 'right' }}>
            <div style={{ float: 'left' }}>
              <button
                style={{}}
                onClick={this.handleClick}
                ref="button"
                className="mdl-button
                  mdl-button--raised
                  mdl-button--colored
                  mdl-button--primary
                  mdl-js-button
                  mdl-js-ripple-effect"
              >
              Go to course
              </button>
              <button
                style={{}}
                onClick={this.deleteQuestion}
                ref="button"
                className="mdl-button
                  mdl-button--raised
                  mdl-button--colored
                  mdl-color--red-A700
                  mdl-js-button
                  mdl-js-ripple-effect"
              >
              Delete course
              </button>
            </div>
          </div>
        </li>
      </div>
    );
  }

  render() {
    return this.state.delete ? this.renderQuestion() : this.renderRoom();
  }
}

RoomItem.propTypes = {
  room: React.PropTypes.object,
};
