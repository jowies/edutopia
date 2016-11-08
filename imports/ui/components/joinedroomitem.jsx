import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { activesession } from '../../api/rooms/methods.js';
import { addToSession } from '../../api/sessions/methods.js';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';


export default class JoinedRoomItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      active: false,
      session: '',
    };
  }

  componentDidMount() {
    activesession.call({ roomId: this.props.room._id }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ active: !!res, session: res });
      }
    });
    upgrade(this.refs.button);
  }

  componentDidUpdate() {
    upgrade(this.refs.button);
  }

  componentWillUnmount() {
    downgrade(this.refs.button);
  }

  getButtonClass() {
    const className1 = 'mdl-button mdl-button--raised mdl-button--colored';
    const className2 = ' mdl-js-button mdl-js-ripple-effect';
    const color = ' mdl-color--light-green-900 mdl-color-text--light-green-50';
    if (this.state.active) {
      return className1 + className2 + color;
    }
    return className1 + className2;
  }

  getText() {
    return this.state.active ? <span>Go to active session</span> : <span>No active sessions</span>;
  }

  handleClick(e) {
    e.preventDefault();
    const route = '/joinedsession/';
    const sessionId = this.state.session._id;
    addToSession.call({ sessionId }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        FlowRouter.go(route + this.state.session._id);
      }
    });
  }

  render() {
    return (
      <div>
        <li
          id={this.props.room._id}
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

            <button
              style={{ float: 'right' }}
              onClick={this.handleClick}
              ref="button"
              className={this.getButtonClass()}
              disabled={!this.state.active}
            >
            {this.getText()}
            </button>

          </span>
          <span className="mdl-list__item-secondary-content">
            {/* <a className="mdl-list__item-secondary-action" href="#">
              <i className="material-icons">star</i>
            </a> */}
          </span>
        </li>
      </div>
    );
  }
}

JoinedRoomItem.propTypes = {
  room: React.PropTypes.object,
};
