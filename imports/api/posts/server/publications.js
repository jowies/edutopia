import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts.js';
import { check } from 'meteor/check';

Meteor.publish('posts.bySession', (sessionId) => {
  check(sessionId, String);
  // console.log(sessionId);
  return Posts.find({ sessionId });
});
Meteor.publish('post.byPost', (postId) => {
  check(postId, String);
  // console.log(postId);
  return Posts.find(postId);
});
