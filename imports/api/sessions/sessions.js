import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Posts } from '../posts/posts.js';

class SessionsCollection extends Mongo.Collection {
  insert(session, callback) {
    const userSession = session;
    userSession.createdAt = userSession.createdAt || new Date();
    userSession.joinedBy = [];
    userSession.joinedAmount = 0;
    return super.insert(userSession, callback);
  }
  remove(selector, callback) {
    Posts.remove({ sessionId: selector });
    return super.remove(selector, callback);
  }

}

export const Sessions = new SessionsCollection('sessions');

Sessions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Sessions.schema = new SimpleSchema({
  createdAt: { type: Date, denyUpdate: true },
  createdBy: { type: String, regEx: SimpleSchema.RegEx.Id },
  roomId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  active: { type: Boolean },
  closedAt: { type: Date, optional: true },
  code: { type: String, optional: true },
  sessionName: { type: String },
  joinedAmount: { type: Number },
  joinedBy: { type: [String] },
  single: { type: Boolean },

});

Sessions.attachSchema(Sessions.schema);

Sessions.publicFields = {
  createdAt: 1,
  createdBy: 1,
  roomId: 1,
  active: 1,
  closedAt: 1,
  single: 1,
};

Sessions.helpers({
  editableBy(userId) {
    if (!this.userId) {
      return true;
    }

    return this.userId === userId;
  },
});

