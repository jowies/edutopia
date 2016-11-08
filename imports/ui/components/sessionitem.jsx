import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class SessionItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const route = '/mysession/';
    FlowRouter.go(route + this.props.session._id);
  }

  getText() {
    return this.props.session.active ? <h4 className="mdl-color-text--green-900">Active</h4> : <h4 className="mdl-color-text--red-900" >Archived</h4>;
  }

  render() {
    return (
      <div>
        <li
          id={this.props.session._id}
          onClick={this.handleClick}
          className="mdl-list__item mdl-list__item--three-line listElement"
        >
          <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-avatar">school</i>
            <span>
              <p>{this.props.session.sessionName}
                <span style={{ float: 'right' }} > &nbsp; created at: &nbsp;
                  <span>{this.props.session.createdAt.toString()}</span>
                </span>
              </p>
            </span>
            <span className="mdl-list__item-text-body">
              {this.getText()}
            </span>
          </span>
          <span className="mdl-list__item-secondary-content">
            <a className="mdl-list__item-secondary-action" href="#">
              <i className="material-icons">star</i>
            </a>
          </span>
        </li>
      </div>
    );
  }
}

SessionItem.propTypes = {
  session: React.PropTypes.object,
};
