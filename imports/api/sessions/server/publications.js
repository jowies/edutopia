import { Meteor } from 'meteor/meteor';
import { Sessions } from '../sessions.js';
import { check } from 'meteor/check';

Meteor.publish('sessions.byRoom', (roomId) => {
  check(roomId, String);
  return Sessions.find({ roomId });
});

Meteor.publish('session.bySession', (sessionId) => {
  check(sessionId, String);
  return Sessions.find(sessionId);
});
