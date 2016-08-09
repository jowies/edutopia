import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Comments } from './comments.js';
import { Posts } from '../posts/posts.js';
import { Sessions } from '../sessions/sessions.js';

const COMMENT_ID_ONLY = new SimpleSchema({
  commentId: { type: String },
}).validator();

export const insert = new ValidatedMethod({
  name: 'comments.insert',
  validate: new SimpleSchema({
    text: { type: String },
    postId: { type: String },
    createdBy: { type: String },
    authorType: { type: String },
  }).validator(),
  run({ text, postId, createdBy, authorType }) {
    const comment = {
      postId,
      createdAt: new Date(),
      createdBy,
      authorType,      // votes: 0,
      // votedBy: [],
      text,
      archived: false,
    };
    Posts.update(postId, {
      $inc: { commentAmount: 1 },
    });
    return Comments.insert(comment);
  },
});

export const remove = new ValidatedMethod({
  name: 'comments.remove',
  validate: COMMENT_ID_ONLY,
  run({ commentId }) {
    const comment = Comments.findOne(commentId);
    const post = Posts.findOne({ _id: comment.postId });
    const session = Sessions.findOne({ _id: post.sessionId });
    if (session) {
      if (!comment.editableBy(this.userId, session.createdBy)) {
        throw new Meteor.Error('comments.remove.accessDenied',
          'You don\'t have permission to remove this comment.');
      }

      Posts.update(comment.postId, {
        $inc: { commentAmount: -1 },
      });
      Comments.remove(commentId);
    }
  },
});


const COMMENTS_METHODS = _.pluck([
  insert,
  remove,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(COMMENTS_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
