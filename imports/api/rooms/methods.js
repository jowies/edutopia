import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Rooms } from './rooms.js';
import { Sessions } from '../sessions/sessions.js';

const ROOM_ID_ONLY = new SimpleSchema({
  roomId: { type: String },
}).validator();

export const insert = new ValidatedMethod({
  name: 'rooms.insert',
  validate: new SimpleSchema({
    nickname: { type: String },
    roomcode: { type: String },
  }).validator(),
  run({ nickname, roomcode }) {
    const already = Rooms.findOne({ nickname });
    if (already) {
      return false;
    }
    const room = {
      createdAt: new Date(),
      createdBy: this.userId,
      joinedBy: [],
      joinedAmount: 0,
      sessionAmount: 0,
      roomcode,
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

export const nickname = new ValidatedMethod({
  name: 'rooms.nickname',
  validate: new SimpleSchema({
    roomId: { type: String },
  }).validator(),
  run({ roomId }) {
    const room = Rooms.findOne(roomId);
    if (room) {
      return room.nickname;
    }
    return !!room;
  },
});

export const activesession = new ValidatedMethod({
  name: 'room.activesession',
  validate: new SimpleSchema({
    roomId: { type: String },
  }).validator(),
  run({ roomId }) {
    const room = Rooms.findOne(roomId);
    const session = Sessions.findOne({ roomId: room._id, active: true });
    if (session) {
      return session;
    }
    return false;
  },
});

export const join = new ValidatedMethod({
  name: 'rooms.join',
  validate: new SimpleSchema({
    roomcode: { type: String },
  }).validator(),
  run({ roomcode }) {
    const room = Rooms.findOne({ roomcode });
    if (room && !_.include(room.joinedBy, this.userId)) {
      Rooms.update(room, {
        $addToSet: { joinedBy: this.userId },
        $inc: { joinedAmount: 1 },
      });
    }
    return !!room;
  },
});

const ROOMS_METHODS = _.pluck([
  insert,
  remove,
  nickname,
  join,
  activesession,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(ROOMS_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
