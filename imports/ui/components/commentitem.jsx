import React from 'react';

export default class CommentItem extends React.Component {
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
      </li>
    );
  }
}

CommentItem.propTypes = {
  comment: React.PropTypes.object,
};
