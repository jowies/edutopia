import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/sessions/sessions.js';
import { Posts } from '../../api/posts/posts.js';
import MySession from '../pages/dashboard/mysession.jsx';

const MySessionContainer = createContainer(({ sessionId }) => {
  let session;
  let posts;
  const sessionHandle = Meteor.subscribe('session.bySession', sessionId);
  const postsHandle = Meteor.subscribe('posts.bySession', sessionId);
  const loading = !sessionHandle.ready && !postsHandle.ready;
  if (!loading) {
    session = Sessions.findOne({ _id: sessionId });
    posts = Posts.find({ sessionId }).fetch();
    console.log(posts);
  }
  return {
    loading,
    connected: Meteor.status().connected,
    session,
    posts,
  };
}, MySession);

export default MySessionContainer;
