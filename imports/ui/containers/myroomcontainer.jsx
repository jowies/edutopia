import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Rooms } from '../../api/rooms/rooms.js';
import { Sessions } from '../../api/sessions/sessions.js';
import MyRoom from '../pages/dashboard/myroom.jsx';

const MyRoomContainer = createContainer(({ roomId }) => {
  let room;
  let sessions;
  const roomHandle = Meteor.subscribe('room.createdByUser', roomId);
  const sessionsHandle = Meteor.subscribe('sessions.byRoom', roomId);
  const loading = !roomHandle.ready && !sessionsHandle.ready;
  if (!loading) {
    room = Rooms.findOne({ createdBy: Meteor.userId(), _id: roomId });
    sessions = Sessions.find({ roomId }).fetch();
  }
  return {
    loading,
    connected: Meteor.status().connected,
    room,
    sessions,
  };
}, MyRoom);

export default MyRoomContainer;
