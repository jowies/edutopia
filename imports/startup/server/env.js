import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  process.env.MAIL_URL = 'smtp://AKIAIXRX2FGZVFJYBK5Q:AukPZNAJ5%2BTNMWlq8U0%2FxhCIppPllde%2BPZ3OIghpSArj@email-smtp.us-west-2.amazonaws.com:465';
});
