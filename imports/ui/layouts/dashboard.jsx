import React from 'react';
import { Meteor } from 'meteor/meteor';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { nickname } from '../../api/rooms/methods.js';
import { code } from '../../api/sessions/methods.js';
import { FlowRouter } from 'meteor/kadira:flow-router';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const userId = Meteor.userId();
    this.state = {
      nickname: '',
      username: userId,
      code: '',
    };
  }

  componentDidMount() {
    upgrade(this.refs.layout);
  }

  componentDidUpdate() {
    upgrade(this.refs.layout);
  }

  componentWillUnmount() {
    downgrade(this.refs.layout);
  }

  getPath() {
    const roomId = FlowRouter.getParam('roomId');
    if (this.props.path === 'nickname' && this.state.nickname.length < 1) {
      nickname.call({ roomId }, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({ nickname: res });
        }
      });
    }
    if (this.props.path === 'nickname') {
      const string = 'My Rooms > ';
      return string + this.state.nickname;
    }
    return this.props.path;
  }

  getCode() {
    const sessionId = FlowRouter.getParam('sessionId');
    if (this.props.path === 'Session' && this.state.nickname.length < 1) {
      code.call({ sessionId }, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({ code: res });
        }
      });
    }
    return (
      <div style={{ float: 'right' }}>
        <span className="mdl-layout-title">
          {this.state.code}
        </span>
      </div>
      );
  }

  render() {
    return (
      <div
        className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
            mdl-layout--fixed-header layout"
        ref="layout"
      >
        <header className="mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600" >
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">
              {this.getPath()}
            </span>
            <div className="mdl-layout-spacer"></div>
            {this.getCode()}
          </div>
        </header>
        <div className="mdl-layout__drawer mdl-color--light-green-900 drawer">
          <nav className="mdl-navigation navigation" >
            <a className="mdl-navigation__link" href="/dashboard/myrooms">
              <i className="material-icons" role="presentation">person</i>
              My Rooms
            </a>
            <a className="mdl-navigation__link" href="/dashboard/joinedrooms" >
              <i className="material-icons" role="presentation">group</i>
              Joined Rooms
            </a>
            <a className="mdl-navigation__link" href="/dashboard/settings">
              <i className="material-icons" role="presentation">settings</i>
                Profile
            </a>
            <a className="mdl-navigation__link" href="">
              <i className="material-icons" role="presentation">exit_to_app</i>
              Log out
            </a>
            <div className="mdl-layout-spacer"></div>
          </nav>
        </div>
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="page-content">{this.props.content}</div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  content: React.PropTypes.object,
  path: React.PropTypes.string,
};
