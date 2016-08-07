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
import AboutUs from '../../ui/pages/homepage/aboutus.jsx';
import Contact from '../../ui/pages/homepage/contact.jsx';
import SignUp from '../../ui/pages/signup.jsx';

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
    mount(Dashboard, { content: <MyRoomsListContainer />, path: 'My Rooms' });
  },
});

FlowRouter.route('/dashboard/myrooms/:roomId', {
  action(params) {
    mount(Dashboard, { content: <MyRoomContainer roomId={params.roomId} />, path: 'nickname' });
  },
});

FlowRouter.route('/session/:sessionId', {
  action(params) {
    mount(Dashboard, { content: <MySessionContainer sessionId={params.sessionId} />, path: 'session' });
  },
});

FlowRouter.route('/dashboard/joinedrooms', {
  action() {
    mount(Dashboard, { content: <JoinedRoomsListContainer />, path: 'Joined rooms' });
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
