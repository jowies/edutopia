import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { upvote } from '../../../imports/api/posts/methods.js';
import { Comments } from '../../api/comments/comments.js';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';

export default class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.goToComments = this.goToComments.bind(this);
    this.upVote = this.upVote.bind(this);
    // add funksjon som finner antall kommentarer
    const postId = this.props.post._id;
    const commentsHandle = Meteor.subscribe('comments.byPost', postId);
    const loading = !commentsHandle.ready;
    if (!loading) {
      const comments = Comments.find({ postId }).fetch();
      const numberOfComments = comments.length;
      const commentString = 'comments (' + numberOfComments + ')';
      this.state = { voted: true, opacity: 0.5, comments: commentString };
    }
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

  goToComments(e) {
    console.log(this.props.post);
    e.preventDefault();
    const route = '/comments/';
    FlowRouter.go(route + this.props.post._id);
  }
  upVote() {
    const postId = this.props.post._id;
    const votedBy = Meteor.userId();
    upvote.call({ postId, votedBy }, (err, res) => {
      if (res === 0) {
        console.log('error when voting');
      } else if (res === -1) {
        this.setState({
          voted: false,
          opacity: 1,
        });
      } else if (res === 1) {
        this.setState({
          voted: true,
          opacity: 0.5,
        });
      }
    });
  }

  render() {
    return (
      <li className="mdl-list__item mdl-list__item--three-line listElement">
        <span className="mdl-list__item-secondary-content" style={{ marginLeft: '0px', paddingRight: '20px' }}>
          <div onClick={this.upVote} className="mdl-list__item-secondary-action" style={{ opacity: this.state.opacity }}>
            <i style={{ fontSize: '32px' }} className="material-icons center">keyboard_arrow_up</i>
          </div>
          <span style={{ fontSize: '16px' }} className="mdl-list__item-secondary-info center">{this.props.post.votes}</span>
        </span>
        <span className="mdl-list__item-primary-content" style={{ maxWidth: '90%', float: 'right' }}>
          <i className="material-icons mdl-list__item-avatar mdl-cell--hide-tablet mdl-cell--hide-phone">person</i>
          <span style={{ paddingLeft: '10px', wordWrap: 'break-word', visibility: 'visible', zIndex: '50', color: 'black' }}>
            {this.props.post.text}
          </span>
          <div style={{ width: '100%' }}>
            <a
              style={{ float: 'right' }}
              onClick={this.goToComments}
              ref="button"
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            >
              {this.state.comments}
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
