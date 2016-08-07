import { Session } from 'meteor/u2622:persistent-session';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

Meteor.startup(() => {
  const id = Random.id;
  Session.setDefaultPersistent('key', id);
});
