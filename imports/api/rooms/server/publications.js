import { Meteor } from 'meteor/meteor';
import { Rooms } from '../rooms.js';
import { check } from 'meteor/check';

Meteor.publish('rooms.createdByUser', function roomsUser() {
  return Rooms.find({ createdBy: this.userId });
});

Meteor.publish('rooms.joinedByUser', function roomsJoined() {
  return Rooms.find({ joinedBy: this.userId }, { createdBy: 0 });
});

Meteor.publish('room.createdByUser', function roomUser(roomId) {
  console.log(roomId);
  check(roomId, String);
  return Rooms.find({ createdBy: this.userId, _id: roomId });
});
