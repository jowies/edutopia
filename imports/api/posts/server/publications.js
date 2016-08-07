import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts.js';
import { check } from 'meteor/check';

Meteor.publish('posts.bySession', (sessionId) => {
  check(sessionId, String);
  console.log(sessionId);
  return Posts.find({ sessionId });
  
});
