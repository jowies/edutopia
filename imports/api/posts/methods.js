import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Posts } from './posts.js';
import { Comments } from '../comments/comments.js';

const POST_ID_ONLY = new SimpleSchema({
  postId: { type: String },
}).validator();

export const insert = new ValidatedMethod({
  name: 'posts.insert',
  validate: new SimpleSchema({
    text: { type: String },
    sessionId: { type: String },
    poster: { type: String },
  }).validator(),
  run({ text, sessionId, createdBy }) {
    const post = {
      createdAt: new Date(),
      createdBy,
      commentAmount: 0,
      votes: 1,
      votedBy: [createdBy],
      text,
      sessionId,
      archived: false,
    };
    return Posts.insert(post);
  },
});

export const remove = new ValidatedMethod({
  name: 'posts.remove',
  validate: POST_ID_ONLY,
  run({ postId }) {
    const post = Posts.findOne(postId);
    if (!post.editableBy(this.userId)) {
      throw new Meteor.Error('posts.remove.accessDenied',
        'You don\'t have permission to remove this post.');
    }
    Comments.remove({ postId });

    Posts.remove(postId);
  },
});

export const upvote = new ValidatedMethod({
  name: 'posts.upvote',
  validate: new SimpleSchema({
    postId: { type: String },
    votedBy: { type: String },
  }).validator(),
  run({ postId, votedBy }) {
    const post = Posts.findOne(postId);

    if (_.include(post.votedBy, postId)) {
      Posts.update(post._id, {
        $pull: { votedBy },
        $inc: { votes: -1, sortvotes: -1 },
      });
    } else if (!_.include(post.votedBy, postId)) {
      Posts.update(post._id, {
        $addToSet: { votedBy },
        $inc: { votes: 1, sortvotes: 1 },
      });
    }
  },
});


const POSTS_METHODS = _.pluck([
  insert,
  remove,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(POSTS_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
