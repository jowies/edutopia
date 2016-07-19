import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Rooms } from './rooms.js';

const ROOM_ID_ONLY = new SimpleSchema({
  listId: { type: String },
}).validator();

export const insert = new ValidatedMethod({
  name: 'rooms.insert',
  validate: new SimpleSchema({
    nickname: { type: String },
  }).validator(),
  run({ nickname }) {
    const room = {
      createdAt: new Date(),
      createdBy: this.userId,
      joinedBy: [],
      joinedAmount: 0,
      nickname,
    };
    return Rooms.insert(room);
  },
});

export const remove = new ValidatedMethod({
  name: 'rooms.remove',
  validate: ROOM_ID_ONLY,
  run({ roomId }) {
    const room = Rooms.findOne(roomId);
    if (!room.editableBy(this.userId)) {
      throw new Meteor.Error('rooms.remove.accessDenied',
        'You don\'t have permission to remove this room.');
    }

    Rooms.remove(roomId);
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
