import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import HomePage from '../../ui/pages/homepage.jsx';
import Home from '../../ui/pages/homepage/home.jsx';
import Dashboard from '../../ui/layouts/dashboard.jsx';
import MyRoomsListContainer from '../../ui/containers/myroomslistcontainer.jsx';
import MyRoomContainer from '../../ui/containers/myroomcontainer.jsx';
import JoinedRoomsListContainer from '../../ui/containers/joinedroomslistcontainer.jsx';
import MySessionContainer from '../../ui/containers/mysessioncontainer.jsx';
import CommentsContainer from '../../ui/containers/commentscontainer.jsx';
import JoinedSessionContainer from '../../ui/containers/joinedsessioncontainer.jsx';
import LecturerCommentsContainer from '../../ui/containers/lecturercommentscontainer.jsx';
import SingleSessionContainer from '../../ui/containers/singlesessioncontainer.jsx';
import AboutUs from '../../ui/pages/homepage/aboutus.jsx';
import Contact from '../../ui/pages/homepage/contact.jsx';
import SignUp from '../../ui/pages/signup.jsx';
import Settings from '../../ui/pages/dashboard/settings.jsx';
import Verified from '../../ui/pages/verified.jsx';


FlowRouter.route('/', {
  action() {
    mount(HomePage, { content: <Home /> });
  },
});

FlowRouter.route('/dashboard', {
  action() {
    mount(Dashboard, { path: 'Home' });
  },
});

FlowRouter.route('/dashboard/myrooms', {
  action() {
    mount(Dashboard, { content: <MyRoomsListContainer />, path: 'My Courses' });
  },
});
FlowRouter.route('/dashboard/settings', {
  action() {
    mount(Dashboard, { content: <Settings />, path: 'Settings' });
  },
});

FlowRouter.route('/dashboard/myrooms/:roomId', {
  action(params) {
    mount(Dashboard, { content: <MyRoomContainer roomId={params.roomId} />, path: 'nickname' });
  },
});

FlowRouter.route('/mysession/:sessionId', {
  action(params) {
    mount(Dashboard, { content: <MySessionContainer sessionId={params.sessionId} />, path: 'Session' });
  },
});

FlowRouter.route('/joinedsession/:sessionId', {
  action(params) {
    mount(JoinedSessionContainer, { sessionId: params.sessionId });
  },
});

FlowRouter.route('/dashboard/comments/:postId', {
  action(params) {
    mount(LecturerCommentsContainer, { postId: params.postId, path: 'Question > comments' });
  },
});
FlowRouter.route('/comments/:postId', {
  action(params) {
    mount(CommentsContainer, { postId: params.postId, path: 'Question > comments' });
  },
});


FlowRouter.route('/dashboard/joinedrooms', {
  action() {
    mount(Dashboard, { content: <JoinedRoomsListContainer />, path: 'Joined courses' });
  },
});

FlowRouter.route('/dashboard/singlesession', {
  action() {
    mount(Dashboard, { content: <SingleSessionContainer />, path: 'Single session' });
  },
});

FlowRouter.route('/aboutus', {
  action() {
    mount(HomePage, { content: <AboutUs /> });
  },
});

FlowRouter.route('/contact', {
  action() {
    mount(HomePage, { content: <Contact /> });
  },
});

FlowRouter.route('/signup', {
  action() {
    mount(SignUp);
  },
});

FlowRouter.route('/verified', {
  action() {
    mount(Verified);
  },
});
