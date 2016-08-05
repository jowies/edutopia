import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Sessions } from '../sessions/sessions.js';

class RoomsCollection extends Mongo.Collection {
  insert(room, callback) {
    const userRoom = room;
    console.log(userRoom);
    userRoom.createdAt = userRoom.createdAt || new Date();
    console.log(userRoom);
    return super.insert(userRoom, callback);
  }
  remove(selector, callback) {
    Sessions.remove({ roomId: selector });
    return super.remove(selector, callback);
  }

}

export const Rooms = new RoomsCollection('rooms');

Rooms.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Rooms.schema = new SimpleSchema({
  createdAt: { type: Date, denyUpdate: true },
  createdBy: { type: String, regEx: SimpleSchema.RegEx.Id },
  joinedBy: { type: [String] },
  joinedAmount: { type: Number, defaultValue: 0 },
  nickname: { type: String, max: 20 },
});

Rooms.attachSchema(Rooms.schema);

Rooms.publicFields = {
  createdAt: 1,
  createdBy: 1,
  joinedBy: 1,
  joinedAmount: 1,
};

Rooms.helpers({
  sessions() {
    console.log(this._id);
    return Sessions.find({ roomId: this._id });
  },
  editableBy(userId) {
    if (!this.userId) {
      return true;
    }

    return this.userId === userId;
  },
});

