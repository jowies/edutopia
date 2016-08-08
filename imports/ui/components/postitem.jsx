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
    if (_.include(voters, Session.get('clientId'))) {
      return 1;
    }
    return 0.5;
  }

  upVote(e) {
    e.preventDefault();
    const postId = this.props.post._id;
    const votedBy = Session.get('clientId');
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
        <span className="mdl-list__item-secondary-content" style={{ marginLeft: '0px', paddingRight: '20px' }}>
          <div onClick={this.upVote} className="mdl-list__item-secondary-action" style={{ opacity: this.getOpacity() }}>
            <i style={{ fontSize: '32px' }} className="material-icons center">keyboard_arrow_up</i>
          </div>
          <span style={{ fontSize: '16px' }} className="mdl-list__item-secondary-info center">{this.props.post.votes}</span>
        </span>
        <span className="mdl-list__item-primary-content" style={{ maxWidth: '90%', float: 'right' }}>
          <i className="material-icons mdl-list__item-avatar mdl-cell--hide-tablet mdl-cell--hide-phone">person</i>
          <span><h5>{this.props.post.authorType}</h5></span>
          <span style={{ paddingLeft: '10px', wordWrap: 'break-word' }}>
            {this.props.post.text}
          </span>
          <div style={{ width: '100%' }}>
            <a
              style={{ float: 'right' }}
              onClick={this.goToComments}
              ref="button"
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            >
              {this.getCommentText()}
            </a>
          </div>
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
