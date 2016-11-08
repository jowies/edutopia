import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/sessions/sessions.js';
import SingleSession from '../pages/dashboard/singlesession.jsx';

const SingleSessionContainer = createContainer(() => {
  let sessions;
  const sessionsHandle = Meteor.subscribe('sessions.byUser');
  console.log(sessionsHandle);
  const loading = !sessionsHandle.ready;
  if (!loading) {
    sessions = Sessions.find({ createdBy: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch();
  }
  console.log(sessions);
  return {
    loading,
    connected: Meteor.status().connected,
    sessions,
  };
}, SingleSession);

export default SingleSessionContainer;
