import React from 'react';
import Upgrade from '../helpers/upgrade.jsx';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Hello!' };
  }

  componentDidMount() {
    Upgrade.upgrade('mdl-js-layout', this.refs.layout);
  }

  componentDidUpdate() {
    Upgrade.upgrade('mdl-js-layout', this.refs.layout);
  }


  render() {
    return (
      <div
        className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
            mdl-layout--fixed-header"
        ref="layout"
      >
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Edutopia</span>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">My Rooms</a>
            <a className="mdl-navigation__link" href="">Joined Rooms</a>
            <a className="mdl-navigation__link" href="">Profile</a>
            <a className="mdl-navigation__link" href="">Log out</a>
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
};
