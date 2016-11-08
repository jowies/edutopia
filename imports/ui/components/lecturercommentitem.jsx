import React from 'react';
import { remove } from '../../../imports/api/comments/methods.js';



export default class LecturerCommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment(e) {
    e.preventDefault();
    const commentId = this.props.comment._id;
    remove.call({ commentId });
  }
  render() {
    return (
      <li className="mdl-list__item mdl-list__item--three-line listElement">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar mdl-cell--hide-tablet mdl-cell--hide-phone">person</i>
          <span>{this.props.comment.authorType}</span>
          <span className="mdl-list__item-text-body">
            {this.props.comment.text}
          </span>
        </span>
        <span className="mdl-list__item-secondary-content">
          <a className="mdl-list__item-secondary-action" onClick={this.deleteComment} href="" >Delete</a>
        </span>
      </li>
    );
  }
}

LecturerCommentItem.propTypes = {
  comment: React.PropTypes.object,
};

/*      <li className="mdl-list__item mdl-list__item--three-line listElement" >
        <span className="mdl-list__item-primary-content" style={{ maxWidth: '90%', float: 'right' }}>
          <i className="material-icons mdl-list__item-avatar mdl-cell--hide-tablet mdl-cell--hide-phone">person</i>
          <span><h5>this.props.post.authorType</h5></span>
        </span>
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar">person</i>
          <span style={{ paddingLeft: '10px' }}>
            {this.props.comment.text}
          </span>
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
        </div>
      </li>
*/


