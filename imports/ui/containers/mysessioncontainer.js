import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Rooms } from '../../api/rooms/rooms.js';
import { Sessions } from '../../api/sessions/sessions.js';
import MySession from '../pages/dashboard/mysession.jsx';

const MysessionContainer = createContainer(({}) => {
  let room;
  let sessions;
  const roomHandle = Meteor.subscribe('room.createdByUser', roomId);
  const sessionsHandle = Meteor.subscribe('sessions.byRoom', roomId);
  const loading = !roomHandle.ready && !sessionsHandle.ready;
  if (!loading) {
    room = Rooms.findOne({ createdBy: Meteor.userId(), _id: roomId });
    sessions = Sessions.find({ roomId }).fetch();
  }
  console.log(room);
  console.log(sessions);
  return {
    loading,
    connected: Meteor.status().connected,
    room,
    sessions,
  };
}, MySession);

export default MyRoomContainer;
