import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../api/rooms/rooms.js';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  const user = {};
  if (Meteor.users.find().count() === 0) {
    user.id = Accounts.createUser({ username: 'Jon', password: 'tester', student: true });
    Rooms.insert({ nickname: 'Checker', createdBy: user.id, joinedBy: [user.id], joinedAmount: 1 });
  }
});
