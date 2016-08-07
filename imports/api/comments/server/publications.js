import { Meteor } from 'meteor/meteor';
import { Comments } from '../comments.js';
import { check } from 'meteor/check';

Meteor.publish('comments.byPost', (postId) => {
  check(postId, String);
  console.log(postId);
  return Comments.find({ postId });
});
