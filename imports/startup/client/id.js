import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Random } from 'meteor/random';

Meteor.startup(() => {
  const id = Random.id;
  Session.set('clientId', id);
});
