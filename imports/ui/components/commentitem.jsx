import React from 'react';

export default class CommentItem extends React.Component {
  render() {
    return (
      <li className="mdl-list__item mdl-list__item--three-line listElement" >
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar">person</i>
          <span style={{ paddingLeft: '10px' }}>
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
