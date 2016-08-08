import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Comments } from '../comments/comments.js';
import { Sessions } from '../sessions/sessions.js';

class PostsCollection extends Mongo.Collection {
  insert(post, callback) {
    const userPost = post;
    console.log(userPost);
    userPost.createdAt = userPost.createdAt || new Date();
    console.log(userPost);
    return super.insert(userPost, callback);
  }
  remove(selector, callback) {
    Comments.remove({ postId: selector });
    return super.remove(selector, callback);
  }

}

export const Posts = new PostsCollection('posts');

Posts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Posts.schema = new SimpleSchema({
  createdAt: { type: Date, denyUpdate: true },
  createdBy: { type: String, regEx: SimpleSchema.RegEx.Id },
  commentAmount: { type: Number, defaultValue: 0 },
  votes: { type: Number, defaultValue: 1 },
  votedBy: { type: [String] },
  text: { type: String, max: 240 },
  sessionId: { type: String, regEx: SimpleSchema.RegEx.Id },
  archived: { type: Boolean },
  authorType: { type: String },
});

Posts.attachSchema(Posts.schema);

Posts.publicFields = {
  createdAt: 1,
  createdBy: 1,
  joinedBy: 1,
  joinedAmount: 1,
};

Posts.helpers({
  editableBy(userId) {
    const session = Sessions.findOne({ _id: this.sessionId });
    if (this.createdBy === userId || session.createdBy === userId) {
      return true;
    }

    return false;
  },
});

