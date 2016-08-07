import { Meteor } from 'meteor/meteor';
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { upgrade, downgrade } from '../../../helpers/upgrade.jsx';
import { Rooms } from '../../../../api/rooms/rooms.js';
import { Accounts } from 'meteor/accounts-base';

export default class EnterLectureCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    /* const roomId = this.state.value;
    const handle = Meteor.subscribe('demoRoomByCode', roomId);
    if (handle.ready()) {
      data.room = DemoRooms.findOne({roomCode: roomId});
    } */
  }
  componentDidMount() {
    upgrade(this.refs.signup, this.refs.login, this.refs.textfield);
  }

  componentDidUpdate() {
    upgrade(this.refs.signup, this.refs.login, this.refs.textfield);
  }

  componentWillUnmount() {
    downgrade(this.refs.signup, this.refs.login, this.refs.textfield);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }
  handleSubmit() {
    console.log('Handle Submit');
    console.log(this.state.value);
    if (this.state.value.length === 4) {
      // kode for å få id gitt av pin

    }
  }
  render() {
    return (
      <div>
        <div
          className="center
            demo-card-square
            mdl-card fixed-size mdl-shadow--2dp"
          style={{ width: '320px' }}
        >
          <div className="mdl-card__title mdl-card--expand">
            <div
              className="
                mdl-card__subtitle-text"
              style={{ paddingTop: '10px', marginTop: '10px' }}
            >
              <h4>Go directly to a lecture</h4>
            </div>
          </div>
          <div className="mdl-card__actions">
            <form onSubmit={this.handleSubmit}>
              <div className="mdl-textfield mdl-js-textfield" ref="textfield">
                <input
                  className="mdl-textfield__input"
                  type="text"
                  pattern="-?[0-9]*(\.[0-9]+)?"
                  id="sample2"
                  maxLength={4}
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <label className="mdl-textfield__label" htmlFor="sample2">PIN...</label>
                <span className="mdl-textfield__error">entered pin is not a number!</span>
              </div>
            </form>
          </div>
          <div className="mdl-card__actions">
            <button
              onClick={this.props.goBack}
              ref="signup"
              className="mdl-button
                mdl-button--raised
                mdl-button--colored
                mdl-color--light-green-500
                mdl-color-text--light-green-50
                mdl-js-button
                mdl-js-ripple-effect"
              style={{ float: 'left' }}

            >
              Go back
            </button>
            <button
              onClick={this.handleSubmit}
              className="mdl-button
                mdl-button--primary
                mdl-button--raised
                mdl-js-button
                mdl-js-ripple-effect"
              ref="login"
              style={{ float: 'right' }}
            >
             Enter
            </button>
          </div>
        </div>
      </div>
    );
  }
}
EnterLectureCard.propTypes = {
  goBack: React.PropTypes.func,
};
