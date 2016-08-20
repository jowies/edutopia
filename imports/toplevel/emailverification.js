import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';

Accounts.onEmailVerificationLink((token, done) => {
  Accounts.verifyEmail(token, (err) => {
    if (err) {
      console.log(err);
    }
    FlowRouter.go('/verified');
    done();
    console.log('success');
  });
});
