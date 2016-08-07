import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Comments } from '../../api/comments/comments.js';
import { Posts } from '../../api/posts/posts.js';
import CommentsPage from '../pages/commentspage.jsx';

const CommentsContainer = createContainer(({ postId }) => {
  let post;
  let comments;
  const postHandle = Meteor.subscribe('post.byPost', postId);
  const commentsHandle = Meteor.subscribe('comments.byPost', postId);
  const loading = !postHandle.ready && !commentsHandle.ready;
  if (!loading) {
    post = Posts.findOne({ _id: postId });
    comments = Comments.find({ postId }).fetch();
  }
  return {
    loading,
    connected: Meteor.status().connected,
    post,
    comments,
  };
}, CommentsPage);

export default CommentsContainer;
