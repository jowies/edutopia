import React from 'react';
import Upgrade from '../../helpers/upgrade.jsx';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Hello!' };
  }

  componentDidMount() {
    Upgrade.upgrade('mdl-js-layout', this.refs.layout);
    Upgrade.upgrade('mdl-js-button', this.refs.signup);
  }

  componentDidUpdate() {
    Upgrade.upgrade('mdl-js-layout', this.refs.layout);
    Upgrade.upgrade('mdl-js-layout', this.refs.signup);
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
              <a className="mdl-navigation__link" href="#">Hello</a>
              <a className="mdl-navigation__link" href="#">World.</a>
              <a className="mdl-navigation__link" href="#">How</a>
              <a className="mdl-navigation__link" href="#">Are</a>
              <a className="mdl-navigation__link" href="#">You?</a>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout__title">Edutopia</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="#">Hello</a>
            <a className="mdl-navigation__link" href="#">World.</a>
            <a className="mdl-navigation__link" href="#">How</a>
            <a className="mdl-navigation__link" href="#">Are</a>
            <a className="mdl-navigation__link" href="#">You?</a>
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div className="center demo-card-square mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title mdl-card--expand">
                </div>
                <div className="mdl-card__actions">
                  <div className="center">
                    <button
                      className="mdl-button
                        mdl-button--colored
                        mdl-button--raised
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
                      className="mdl-button
                        mdl-button--accent
                        mdl-button--raised
                        mdl-js-button
                        mdl-js-ripple-effect"
                      ref="signup"
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
