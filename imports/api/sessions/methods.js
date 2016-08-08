import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Sessions } from './sessions.js';
import { Posts } from '../posts/posts.js';
import { Rooms } from '../rooms/rooms.js';

const ROOM_ID_ONLY = new SimpleSchema({
  listId: { type: String },
}).validator();

export const insert = new ValidatedMethod({
  name: 'sessions.insert',
  validate: null,
  run({ roomId }) {
    console.log(roomId);
    const room = Rooms.findOne(roomId);
    Rooms.update(roomId, {
      $inc: { sessionAmount: 1 },
    });
    const def = 'Session ';
    const sessionName = def + (room.sessionAmount + 1).toString();
    const session = {
      createdAt: new Date(),
      createdBy: this.userId,
      roomId,
      active: true,
      sessionName,
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


export const code = new ValidatedMethod({
  name: 'sessions.code',
  validate: new SimpleSchema({
    sessionId: { type: String },
  }).validator(),
  run({ sessionId }) {
    const session = Sessions.findOne(sessionId);
    if (session) {
      return session.code;
    }
    return !!session;
  },
});

export const joinSession = new ValidatedMethod({
  name: 'sessions.joinByCode',
  validate: new SimpleSchema({
    code: { type: String },
    userId: { type: String },
  }).validator(),
  run({ code, userId }) {
    const session = Sessions.findOne({ code });
    let room;
    console.log(session);
    if (session) {
      room = Rooms.findOne({ _id: session.roomId });
    }
    if (!!session && !!room) {
      if (!_.include(room.joinedBy, userId)) {
        Rooms.update(session.roomId, {
          $addToSet: { joinedBy: userId },
          $inc: { joined: 1 },
        });
      }
      console.log(session._id);
      return session._id;
    }
    return false;
  },
});

const ROOMS_METHODS = _.pluck([
  insert,
  remove,
  joinSession,
  code,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(ROOMS_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
