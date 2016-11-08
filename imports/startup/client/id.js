import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Random } from 'meteor/random';

Meteor.startup(() => {
  if (!!window.localStorage.getItem('client')) {
    Session.set('client', window.localStorage.getItem('client'));
  } else {
    const random = Random.id();
    window.localStorage.setItem('client', random);
    Session.set('random');
  }
});
