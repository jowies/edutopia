import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Button from '../components/button.jsx';

export default class SessionItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.upVote = this.upVote.bind(this);
    // add funksjon som finner antall kommentarer
    const numberOfComments = 0;
    const commentString = 'comments (' + numberOfComments + ')';
    this.state = { voted: true, opacity: 0.5, comments: commentString };
  }

  handleClick(e) {
    console.log(this.props.post);
    e.preventDefault();
    const route = '/session/post/';
    FlowRouter.go(route + this.props.post._id);
  }
  upVote() {
    console.log('voted');
    if (this.state.voted === true) {
      this.setState({
        voted: false,
        opacity: 1,
      });
    }
    if (this.state.voted === false) {
      this.setState({
        voted: true,
        opacity: 0.5,
      });
    }
  }

  render() {
    return (
      <li className="mdl-list__item mdl-list__item--three-line listElement" >
      <span className="mdl-list__item-secondary-content" style={{ paddingRight: '10px', marginLeft: '0px' }}>
          <div onClick={this.upVote} className="mdl-list__item-secondary-action" style={{ opacity: this.state.opacity }}>
            <i style={{ fontSize: '32px' }} className="material-icons center">keyboard_arrow_up</i>
          </div>
          <span style={{ fontSize: '16px' }} className="mdl-list__item-secondary-info center">{this.props.post.votes}</span>
        </span>
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-avatar">person</i>
          <span style={{ paddingLeft: '10px' }}>
            {this.props.post.text}
          </span>
        </span>

        
        <span className="center">
          <Button label={this.state.comments} onClick={this.goToComments} />
        </span>
        
      </li>
    );
  }
}

SessionItem.propTypes = {
  post: React.PropTypes.object,
};
