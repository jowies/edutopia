import React from 'react';
import upgrade from '../helpers/upgrade.jsx';

export default class HomePage extends React.Component {

  componentDidMount() {
    upgrade(this.refs.layout);
  }

  componentDidUpdate() {
    upgrade(this.refs.layout);
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout layouttest" ref="layout">
        <header className="mdl-layout__header mdl-layout__header--scroll">
          <div className="mdl-layout-icon"></div>
          <div className="mdl-layout__header-row">
            <span className="mdl-layout__title">Edutopia</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <a className="mdl-navigation__link" href="/">Home</a>
              <a className="mdl-navigation__link" href="/AboutUs">About Edutopia</a>
              <a className="mdl-navigation__link" href="/Contact">Contact</a>
              <a className="mdl-navigation__link" href="#">Get started</a>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout__title">Edutopia</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="/">Home</a>
            <a className="mdl-navigation__link" href="/AboutUs">About Edutopia</a>
            <a className="mdl-navigation__link" href="/Contact">Contact</a>
            <a className="mdl-navigation__link" href="#">Get started</a>
          </nav>
        </div>
        <main className="mdl-layout__content">
          {this.props.content}
        </main>
      </div>
    );
  }
}

HomePage.propTypes = {
  content: React.PropTypes.object,
};

