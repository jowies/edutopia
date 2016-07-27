import React from 'react';
import upgrade from '../../helpers/upgrade.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Hello!' };
  }

  componentDidMount() {
    upgrade(this.refs.layout);
    upgrade(this.refs.signup);
    upgrade(this.refs.login);
  }

  componentDidUpdate() {
    upgrade(this.refs.layout);
    upgrade(this.refs.signup);
    upgrade(this.refs.login);
  }

  logIn() {
    FlowRouter.go('/dashboard');
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
              <a className="mdl-navigation__link" href="/aboutus">About Edutopia</a>
              <a className="mdl-navigation__link" href="/contact">Contact</a>
              <a className="mdl-navigation__link" href="#">Get started</a>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout__title">Edutopia</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="/">Home</a>
            <a className="mdl-navigation__link" href="/aboutus">About Edutopia</a>
            <a className="mdl-navigation__link" href="/contact">Contact</a>
            <a className="mdl-navigation__link" href="#">Get started</a>
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className="center demo-card-square mdl-card mdl-shadow--2dp" style={{ width: '320px' }}>
                <div className="mdl-card__title mdl-card--expand">
                </div>
                <div className="mdl-card__actions">
                  <div className="center">
                    <button
                      className="mdl-button
                        mdl-button--raised
                        mdl-button--colored
                        mdl-color--light-green-500
                        mdl-color-text--light-green-50
                        mdl-js-button
                        mdl-js-ripple-effect"
                      ref="signup"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
                <div className="mdl-card__supporting-text">
                  or
                </div>
                <div className="mdl-card__actions">
                  <div className="center">
                    <button
                      onClick={this.logIn}
                      className="mdl-button
                        mdl-button--primary
                        mdl-button--raised
                        mdl-js-button
                        mdl-js-ripple-effect"
                      ref="login"
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
            </div>
          </div>
        </main>
      </div>

    );
  }
}
