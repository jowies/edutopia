import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../api/rooms/rooms.js';
import { Sessions } from '../../api/sessions/sessions.js';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  const user = {};
  const room = {};
  if (Meteor.users.find().count() === 0) {
    user.id = Accounts.createUser({ username: 'Jon', password: 'tester' });
    Rooms.insert({ nickname: 'Checker', createdBy: user.id, joinedBy: [user.id], joinedAmount: 1 });
    Rooms.insert({ nickname: 'Cher1', createdBy: user.id, joinedBy: [user.id], joinedAmount: 1 });
    room.id = Rooms.insert({ nickname: 'Cher2', createdBy: user.id, joinedBy: [user.id], joinedAmount: 1 });
    Sessions.insert({ createdBy: user.id, roomId: room.id, active: true });
  }
});
