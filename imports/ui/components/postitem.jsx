import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { upvote } from '../../../imports/api/posts/methods.js';
import { Comments } from '../../api/comments/comments.js';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';

export default class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.goToComments = this.goToComments.bind(this);
    this.upVote = this.upVote.bind(this);
  }
  componentDidMount() {
    upgrade(this.refs.button);
  }

  componentDidUpdate() {
    upgrade(this.refs.button);
  }

  componentWillUnmount() {
    downgrade(this.refs.button);
  }

  getCommentText() {
    const commentString = 'comments (' + this.props.post.commentAmount + ')';
    return commentString;
  }

  getOpacity() {
    const voters = this.props.post.votedBy;
    const id = Meteor.userId() || Session.get('client');
    if (_.include(voters, id)) {
      return 1;
    }
    return 0.5;
  }

  upVote(e) {
    e.preventDefault();
    const postId = this.props.post._id;
    const votedBy = Meteor.userId() || Session.get('client');
    upvote.call({ postId, votedBy }, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }

  goToComments(e) {
    console.log(this.props.post);
    e.preventDefault();
    const route = '/comments/';
    FlowRouter.go(route + this.props.post._id);
  }

  render() {
    return (
      <li className="mdl-list__item mdl-list__item--three-line listElement">
        <span style={{ minWidth: '20px' }} className="mdl-list__item-secondary-content mdl-color-text--grey-900">
          <a className="mdl-list__item-secondary-action mdl-color-text--grey-900" onClick={this.upVote} style={{ opacity: this.getOpacity() }}>
            <i className="material-icons mdl-color-text--grey-900">keyboard_arrow_up</i>
            <p style={{ textAlign: 'center' }}>{this.props.post.votes}</p>
          </a>
        </span>
        <span style={{ maxWidth: '70%' }} className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar mdl-cell--hide-tablet mdl-cell--hide-phone">person</i>
          <span>{this.props.post.authorType}</span>
          <span style={{ wordWrap: 'break-word' }}>
            {this.props.post.text}
          </span>
        </span>
        <span>
          <a
            style={{ float: 'right' }}
            onClick={this.goToComments}
            ref="button"
            className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
          >
            {this.getCommentText()}
          </a>
        </span>
      </li>
    );
  }
}
/* <button onClick={this.goToComments} ref="button" className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary mdl-color--light-blue-900">
          {this.state.comments}
        </button> */
PostItem.propTypes = {
  post: React.PropTypes.object,
};


