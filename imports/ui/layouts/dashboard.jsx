import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';


export default class Dashboard extends React.Component {

  componentDidMount() {
    upgrade(this.refs.layout);
  }

  componentDidUpdate() {
    upgrade(this.refs.layout);
  }

  componentWillUnmount() {
    downgrade(this.refs.layout);
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
              {this.props.path}
            </span>
          </div>
        </header>
        <div className="mdl-layout__drawer mdl-color--light-green-900 drawer">
          <nav className="mdl-navigation navigation" >
            <a className="mdl-navigation__link" href="">
              <i className="material-icons" role="presentation">person</i>
              My Rooms
            </a>
            <a className="mdl-navigation__link" href="" >
              <i className="material-icons" role="presentation">group</i>
              Joined Rooms
            </a>
            <a className="mdl-navigation__link" href="">
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
        <main className="mdl-layout__content">
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
