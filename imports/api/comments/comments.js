import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Posts } from '../posts/posts.js';
import { Sessions } from '../sessions/sessions.js';

class CommentsCollection extends Mongo.Collection {
  insert(comment, callback) {
    const userComment = comment;
    userComment.createdAt = userComment.createdAt || new Date();
    return super.insert(userComment, callback);
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }

}

export const Comments = new CommentsCollection('comments');

Comments.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Comments.schema = new SimpleSchema({
  createdAt: { type: Date, denyUpdate: true },
  createdBy: { type: String, regEx: SimpleSchema.RegEx.Id },
  // votes: { type: Number, defaultValue: 1 },
  // votedBy: { type: [String] },
  text: { type: String, max: 240 },
  postId: { type: String, regEx: SimpleSchema.RegEx.Id },
  archived: { type: Boolean },
  authorType: { type: String },
});

Comments.attachSchema(Comments.schema);

Comments.publicFields = {
  createdAt: 1,
  createdBy: 1,
  joinedBy: 1,
  joinedAmount: 1,
};

Comments.helpers({
  editableBy(userId, admin) {
    if (this.createdBy === userId || admin === userId) {
      return true;
    }
    return false;
  },
});

