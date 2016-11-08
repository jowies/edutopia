import { Accounts } from 'meteor/accounts-base';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Accounts.onCreateUser((options, user) => {
  // const student = options.student;
  /* new SimpleSchema({
    student: { type: Boolean },
  }).validate({ student }); */
  const newUser = user;
  newUser.subsribed = options.subscribed;
  return newUser;
});
