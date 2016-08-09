import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { upvote, remove } from '../../../imports/api/posts/methods.js';
import { Comments } from '../../api/comments/comments.js';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { _ } from 'meteor/underscore';


export default class PostItemLecturer extends React.Component {
  constructor(props) {
    super(props);
    this.goToComments = this.goToComments.bind(this);
    this.upVote = this.upVote.bind(this);
    this.deletePost = this.deletePost.bind(this);
    // add funksjon som finner antall kommentarer
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
    if (_.include(voters, Meteor.userId())) {
      return 1;
    }
    return 0.5;
  }

  goToComments(e) {
    console.log(this.props.post);
    e.preventDefault();
    const route = '/dashboard/comments/';
    FlowRouter.go(route + this.props.post._id);
  }

  upVote(e) {
    e.preventDefault();
    const postId = this.props.post._id;
    const votedBy = Meteor.userId();
    upvote.call({ postId, votedBy }, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }

  deletePost(e) {
    e.preventDefault();
    const postId = this.props.post._id;
    remove.call({ postId });
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
          <span className="mdl-list__item-text-body" style={{ wordWrap: 'break-word' }}>
            {this.props.post.text}
          </span>
        </span>
        
        <span>
          <a
            style={{ float: 'right' }}
            onClick={this.deletePost}
            ref="button"
            className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
          >
          Delete
          </a>
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
PostItemLecturer.propTypes = {
  post: React.PropTypes.object,
};

/*
  <li className="mdl-list__item mdl-list__item--three-line listElement">
        <span className="mdl-list__item-secondary-content" style={{ marginLeft: '0px', paddingRight: '20px' }}>
          <div onClick={this.upVote} className="mdl-list__item-secondary-action" style={{ opacity: this.getOpacity() }}>
            <i style={{ fontSize: '32px' }} className="material-icons center">keyboard_arrow_up</i>
          </div>
          <span style={{ fontSize: '16px' }} className="mdl-list__item-secondary-info center">{this.props.post.votes}</span>
        </span>

        <div className="mdl-list__item-primary-content mdl-cell--hide-tablet mdl-cell--hide-phone flexDisplay flexDirectionColumn" style={{ maxWidth: '90%', float: 'right' }}>
          <i className="material-icons mdl-list__item-avatar">person</i>
          <p style={{ fontWeight: 'bold' }}>{this.props.post.authorType}</p>
        </div>

        <div className="mdl-list__item-primary-content">
          <span style={{ paddingLeft: '10px', wordWrap: 'break-word' }}>
            {this.props.post.text}
          </span>
          <div style={{ width: '100%' }}>
            <a
              style={{ float: 'right' }}
              onClick={this.deletePost}
              ref="button"
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            >
            Delete
            </a>
            <a
              style={{ float: 'right' }}
              onClick={this.goToComments}
              ref="button"
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            >
            
              {this.getCommentText()}
            </a>
          </div>
        </div>
        
      </li>
*/

