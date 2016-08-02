import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import HomePage from '../../ui/pages/homepage.jsx';
import Home from '../../ui/pages/homepage/home.jsx';
import Dashboard from '../../ui/layouts/dashboard.jsx';
import MyRoomsListContainer from '../../ui/containers/myroomslistcontainer.jsx';
import JoinedRoomsListContainer from '../../ui/containers/joinedroomslistcontainer.jsx';
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
    mount(Dashboard);
  },
});

FlowRouter.route('/dashboard/myrooms', {
  action() {
    mount(Dashboard, { content: <MyRoomsListContainer />, path: 'My Rooms' });
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
