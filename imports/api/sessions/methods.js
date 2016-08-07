import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Sessions } from './sessions.js';
import { Posts } from '../posts/posts.js';

const ROOM_ID_ONLY = new SimpleSchema({
  listId: { type: String },
}).validator();

export const insert = new ValidatedMethod({
  name: 'sessions.insert',
  validate: new SimpleSchema({
    nickname: { type: String },
  }).validator(),
  run({ nickname }) {
    const session = {
      createdAt: new Date(),
      createdBy: this.userId,
      nickname,
    };
    return Sessions.insert(session);
  },
});

export const remove = new ValidatedMethod({
  name: 'sessions.remove',
  validate: ROOM_ID_ONLY,
  run({ sessionId }) {
    const sessions = Sessions.findOne(sessionId);
    if (!sessions.editableBy(this.userId)) {
      throw new Meteor.Error('sessions.remove.accessDenied',
        'You don\'t have permission to remove this room.');
    }

    Posts.remove({ sessionId });

    Sessions.remove(sessionId);
  },
});

const ROOMS_METHODS = _.pluck([
  insert,
  remove,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(ROOMS_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
