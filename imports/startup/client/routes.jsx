import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import HomePage from '../../ui/pages/homepage.jsx';
import Home from '../../ui/pages/homepage/home.jsx';
import Dashboard from '../../ui/layouts/dashboard.jsx';
// import ListContainer from '../../ui/containers/listcontainer.jsx';

FlowRouter.route('/', {
  action() {
    mount(HomePage, { content: <Home /> });
  },
});

FlowRouter.route('/dashboard', {
  action() {
    mount(Dashboard, {});
  },
});

