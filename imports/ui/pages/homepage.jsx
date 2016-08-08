import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';

export default class HomePage extends React.Component {

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
      <div className="mdl-layout mdl-js-layout layouthome mdl-layout--fixed-header" ref="layout">
        <header className="mdl-layout__header mdl-layout__header--scroll">
          <div className="mdl-layout-icon"></div>
          <div className="mdl-layout__header-row">
            <span className="mdl-layout__title">Edutopia</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <a className="mdl-navigation__link" href="/">Home</a>
              <a className="mdl-navigation__link" href="/AboutUs">About Edutopia</a>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout__title">Edutopia</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="/">Home</a>
            <a className="mdl-navigation__link" href="/AboutUs">About Edutopia</a>

          </nav>
        </div>
        <main className="mdl-layout__content center">
          {this.props.content}
        </main>
      </div>
    );
  }
}

HomePage.propTypes = {
  content: React.PropTypes.object,
};
/*

              <a className="mdl-navigation__link" href="/Contact">Contact</a>
              <a className="mdl-navigation__link" href="#">Get started</a>
            <a className="mdl-navigation__link" href="/Contact">Contact</a>
            <a className="mdl-navigation__link" href="#">Get started</a>
*/

