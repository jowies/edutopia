import { Accounts } from 'meteor/accounts-base';


Accounts.emailTemplates.from = 'Edutopia <admin@edutopia.io>';
Accounts.config({
  sendVerificationEmail: true,
});
