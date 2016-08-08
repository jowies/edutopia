import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/sessions/sessions.js';
import { Posts } from '../../api/posts/posts.js';
import JoinedSession from '../pages/joinedsession.jsx';

const JoinedSessionContainer = createContainer(({ sessionId }) => {
  let session;
  let posts;
  const sessionHandle = Meteor.subscribe('session.bySession', sessionId);
  const postsHandle = Meteor.subscribe('posts.bySession', sessionId);
  const loading = !sessionHandle.ready && !postsHandle.ready;
  if (!loading) {
    session = Sessions.findOne({ _id: sessionId });
    posts = Posts.find({ sessionId }, { sort: { createdAt: -1 } }).fetch();
    // console.log(posts);
  }
  return {
    loading,
    connected: Meteor.status().connected,
    session,
    posts,
  };
}, JoinedSession);

export default JoinedSessionContainer;
