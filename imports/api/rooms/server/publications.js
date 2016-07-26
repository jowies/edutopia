import { Meteor } from 'meteor/meteor';
import { Rooms } from '../rooms.js';

Meteor.publish('rooms.createdByUser', function roomsUser() {
  return Rooms.find({ createdBy: this.userId });
});

Meteor.publish('rooms.joinedByUser', function roomsJoined() {
  return Rooms.find({ joinedBy: this.userId }, { createdBy: 0 });
});

