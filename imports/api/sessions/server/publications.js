import { Meteor } from 'meteor/meteor';
import { Sessions } from '../sessions.js';
import { check } from 'meteor/check';

Meteor.publish('sessions.byRoom', (roomId) => {
  check(roomId, String);
  console.log(roomId);
  return Sessions.find({ roomId: roomId });
});
