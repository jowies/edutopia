import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class SessionItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const route = '/session/post/';
    FlowRouter.go(route + this.props.post._id);
  }

  render() {
    return (
      <li className="mdl-list__item mdl-list__item--three-line listElement" >
        <span className="mdl-list__item-primary-content">
          <i className="material-icons">live_help</i>
          <span>
            <p> Oppdiktet navn </p>
          </span>
        </span>
        <span className="mdl-list__item-secondary-content">
          <h5>Here is the question coming</h5>
        </span>
      </li>
    );
  }
}

SessionItem.propTypes = {
  post: React.PropTypes.object,
};
