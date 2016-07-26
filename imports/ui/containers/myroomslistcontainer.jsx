import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Rooms } from '../../api/rooms/rooms.js';
import MyRooms from '../pages/dashboard/myrooms.jsx';

const MyRoomsListContainer = createContainer(() => {
  const roomsHandle = Meteor.subscribe('rooms.createdByUser');
  const loading = !roomsHandle.ready;
  const finder = { createdBy: Meteor.userId() };
  const room = Rooms.findOne(finder);
  const noRooms = !loading && !!room;
  return {
    loading,
    connected: Meteor.status().connected,
    rooms: Rooms.find(finder).fetch(),
    noRooms,
  };
}, MyRooms);

export default MyRoomsListContainer;
