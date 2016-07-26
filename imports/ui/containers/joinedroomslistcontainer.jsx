import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Rooms } from '../../api/rooms/rooms.js';
import JoinedRooms from '../pages/dashboard/joinedrooms.jsx';


const JoinedRoomsListContainer = createContainer(() => {
  const roomsHandle = Meteor.subscribe('rooms.joinedByUser');
  const loading = !roomsHandle.ready;
  const finder = { joinedBy: Meteor.userId() };
  const room = Rooms.findOne(finder);
  const noRooms = !loading && !!room;
  return {
    loading,
    connected: Meteor.status().connected,
    rooms: Rooms.find(finder).fetch(),
    noRooms,
  };
}, JoinedRooms);

export default JoinedRoomsListContainer;
