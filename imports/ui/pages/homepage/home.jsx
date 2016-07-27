import React from 'react';

const Home = () => (
  <div className="mdl-grid">
    <div className="mdl-cell mdl-cell--4-col">
    </div>
    <div className="mdl-cell mdl-cell--4-col">
      <div className="center demo-card-square mdl-card mdl-shadow--2dp" style={{ width: '320px' }}>
        <div className="mdl-card__title mdl-card--expand">
          <div className="center mdl-card__subtitle-text" style={{ paddingTop: '10px', marginTop: '10px' }}>
            <h1>Edutopia</h1>
          </div>
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
);

export default Home;

