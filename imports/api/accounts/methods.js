import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

export const isUserUsername = new ValidatedMethod({
  name: 'isuser.username',
  validate: new SimpleSchema({
    username: { type: String },
  }).validator(),
  run({ username }) {
    const user = Meteor.users.findOne({ username });
    return !!user;
  },
});

export const isUserEmail = new ValidatedMethod({
  name: 'isuser.email',
  validate: new SimpleSchema({
    email: { type: String },
  }).validator(),
  run({ email }) {
    const user = Meteor.users.findOne({ email });

    return !!user;
  },
});

export const sendVerificationLink = new ValidatedMethod({
  name: 'verify.email',
  validate: null,
  run() {
    const user = Meteor.userId;
    if (user && Meteor.isServer) {
      Accounts.sendVerificationEmail(user);
    }
  },
});


const ACCOUNTS_METHODS = _.pluck([
  isUserUsername,
  isUserEmail,
  sendVerificationLink,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(ACCOUNTS_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 10, 1000);
}
