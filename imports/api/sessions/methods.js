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

/*export const joinSession = new ValidatedMethod({
  name: 'sessions.joinByCode',
  validate: null,
  run(data) {
    const code = data.code;
    const userId = data.userId;
    console.log(code);
    const session = Sessions.findOne({ code: '4553' })
    console.log(session);
    const room = Rooms.findOne({ _id: session.roomId });
    if (session && room) {
      if (!_.include(room.joinedBy, userId)) {
        Rooms.update(session.roomId, {
          $addToSet: { joinedBy: userId },
          $inc: { joined: 1 },
        });
      }
      return session._id;
    }
    return false;
  },
});
*/

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
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(ROOMS_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
