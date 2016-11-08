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
  run({ single, roomId, sessionNameUser }) {
    let session;
    if (single) {
      const sessionName = sessionNameUser || 'Session';
      const generateCode = Math.floor((Math.random() * 9000 + 1000)).toString();
      const code = generateCode;
      session = {
        createdAt: new Date(),
        createdBy: this.userId,
        code,
        single: true,
        active: true,
        sessionName,
      };
    } else {
      const room = Rooms.findOne(roomId);
      Rooms.update(roomId, {
        $inc: { sessionAmount: 1 },
      });
      const def = 'Session ';
      const sessionName = sessionNameUser || (def + (room.sessionAmount + 1).toString());
      session = {
        createdAt: new Date(),
        createdBy: this.userId,
        roomId,
        single: false,
        active: true,
        sessionName,
      };
    }
    if (!single) {
      Sessions.update({ roomId }, { $set: { active: false } }, { multi: true });
    }
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

/* export const joinSession = new ValidatedMethod({
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
          $inc: { joinedAmount: 1 },
        });
      }
      console.log(session._id);
      return session._id;
    }
    return false;
  },
}); */

export const addToSession = new ValidatedMethod({
  name: 'sessions.addTo',
  validate: new SimpleSchema({
    sessionId: { type: String },
  }).validator(),
  run({ sessionId }) {
    if (Meteor.isServer) {
      const user = this.userId;
      const _id = sessionId;
      const session = Sessions.findOne({ _id: sessionId });
      if (session && !_.include(session.joinedBy, user)) {
        Sessions.update({ _id }, {
          $addToSet: { joinedBy: user },
          $inc: { joinedAmount: 1 },
        });
      }
    }
  },
});

export const join = new ValidatedMethod({
  name: 'session.join',
  validate: new SimpleSchema({
    sessionCode: { type: String },
    user: { type: String },
  }).validator(),
  run({ sessionCode, user }) {
    const session = Sessions.findOne({ code: sessionCode });
    if (session && !_.include(session.joinedBy, this.userId || user)) {
      Sessions.update(session, {
        $addToSet: { joinedBy: user },
        $inc: { joinedAmount: 1 },
      });
    }
    return { session }
    ;
  },
});

export const end = new ValidatedMethod({
  name: 'sessions.end',
  validate: new SimpleSchema({
    sessionId: { type: String },
  }).validator(),
  run({ sessionId }) {
    if (Meteor.isServer) {
      const user = this.userId;
      const session = Sessions.findOne({ _id: sessionId });
      if (session.createdBy === user) {
        Sessions.update({ _id: sessionId }, { $set: { active: false } });
      }
    }
  },
});

const ROOMS_METHODS = _.pluck([
  insert,
  remove,
  code,
  addToSession,
  end,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(ROOMS_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
