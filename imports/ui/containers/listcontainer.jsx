import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Rooms } from '../../api/rooms/rooms.js';
import { RoomList } from '../components/dashboard/roomlist.jsx';

const RoomListContainer = createContainer((subscription) => {
  const roomsHandle = Meteor.subscribe(subscription);
  const loading = !roomsHandle.ready;
  const room = Rooms.findOne(Meteor.userId());
  const roomExists = !loading && !!room;
  const finder = {};
  if (subscription === 'rooms.joinedByUser') { finder.joinedBy = Meteor.userId(); }
  if (subscription === 'rooms.createdByUser') { finder.createdBy = Meteor.userId(); }
  return {
    loading,
    connected: Meteor.status().connected,
    rooms: Rooms.find(finder),
    roomExists,
  };
}, RoomList);

export default RoomListContainer;
