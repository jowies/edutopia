import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../api/rooms/rooms.js';
import { Sessions } from '../../api/sessions/sessions.js';
import { Posts } from '../../api/posts/posts.js';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  const user = {};
  const room = {};
  const session = {};
  const date = new Date();
  if (Meteor.users.find().count() === 0) {
    user.id = Accounts.createUser({ username: 'Jon', password: 'tester' });
    Rooms.insert({
      nickname: 'Checker',
      createdBy: user.id,
      joinedBy: [user.id],
      joinedAmount: 1,
      createdAt: date.toLocaleDateString() });
    Rooms.insert({
      nickname: 'Cher1',
      createdBy: user.id,
      joinedBy: [user.id],
      joinedAmount: 2,
      createdAt: date.toLocaleDateString() });
    Rooms.insert({
      nickname: 'Cher3',
      createdBy: user.id,
      joinedBy: [user.id],
      joinedAmount: 2,
      createdAt: date.toLocaleDateString() });
    Rooms.insert({
      nickname: 'Cher4',
      createdBy: user.id,
      joinedBy: [user.id],
      joinedAmount: 1,
      createdAt: date.toLocaleDateString() });
    Rooms.insert({
      nickname: 'Cher5',
      createdBy: user.id,
      joinedBy: [user.id],
      joinedAmount: 6,
      createdAt: date.toLocaleDateString() });
    room.id = Rooms.insert({
      nickname: 'Cher2',
      createdBy: user.id,
      joinedBy: [user.id],
      joinedAmount: 3,
    });
    session.id = Sessions.insert({
      createdBy: user.id,
      roomId: room.id,
      active: true,
      sessionName: 'Lecture 1',
    });
    Sessions.insert({
      createdBy: user.id,
      roomId: room.id,
      active: true,
      sessionName: 'Lecture 2',
    });
    Sessions.insert({
      createdBy: user.id,
      roomId: room.id,
      active: true,
      sessionName: 'Lecture 3',
    });
    Posts.insert({
      createdBy: 'hWNDLGg3wSbXFQJc5',
      sessionId: session.id,
      archived: false,
      votes: 3,
      votedBy: ['hWNDLGg3wSbXFQJc5', 'hWNDLGg3wSbXFQJc5', 'hWNDLGg3wSbXFQJc5'],
      text: 'Hvor mange kroner  får jeg hvis jeg spør jævlki snilt',
    });
  }
});
