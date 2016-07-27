import React from 'react';

const Contact = () => (
  <div>
    <div className="mdl-grid" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} >
      <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone" >
      </div>
      <div
        className="mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      >
        <div className="center demo-card-square mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title mdl-card--expand">
            <div className="center mdl-card__subtitle-text">
            <h1>Send us a message</h1>
            </div>
          </div>
          <div className="mdl-card__actions">
            <div className="center">
            <form>
            <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" id="sample1" />
              <label className="mdl-textfield__label" htmlFor="sample1">Name...</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" id="sample1" />
              <label className="mdl-textfield__label" htmlFor="sample1">email...</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <textarea className="mdl-textfield__input" type="text" rows="3" id="sample5" ></textarea>
              <label className="mdl-textfield__label" htmlFor="sample5">Comment...</label>
            </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className="mdl-mini-footer">
      <div className="mdl-mini-footer__left-section">
        <div className="mdl-logo">
          More Information
        </div>
        <ul className="mdl-mini-footer__link-list">
          <li><a href="#">Help</a></li>
          <li><a href="#">Privacy and Terms</a></li>
          <li><a href="#">User Agreement</a></li>
        </ul>
      </div>
      <div className="mdl-mini-footer__right-section">
        <ul className="mdl-mini-footer__link-list">
          <li><a href="#">Facebook-link</a></li>
          <li><a href="#">Mail-link</a></li>
        </ul>
      </div>
    </footer>
  </div>
);

export default Contact;
