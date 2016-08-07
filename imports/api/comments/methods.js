import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Comments } from './comments.js';

const COMMENT_ID_ONLY = new SimpleSchema({
  commentId: { type: String },
}).validator();

export const insert = new ValidatedMethod({
  name: 'comments.insert',
  validate: new SimpleSchema({
    nickname: { type: String },
  }).validator(),
  run({ text, sessionId }) {
    const comment = {
      createdAt: new Date(),
      createdBy: sessionId,      // votes: 0,
      // votedBy: [],
      text,
      sessionId,
      archived: false,
    };
    return Comments.insert(comment);
  },
});

export const remove = new ValidatedMethod({
  name: 'comments.remove',
  validate: COMMENT_ID_ONLY,
  run({ commentId }) {
    const comment = Comments.findOne(commentId);
    if (!comment.editableBy(this.userId)) {
      throw new Meteor.Error('comments.remove.accessDenied',
        'You don\'t have permission to remove this comment.');
    }
    Comments.remove(commentId);
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
