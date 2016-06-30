import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { HomePage } from '../../ui/pages/homepage.jsx';
import Home from '../../ui/pages/homepage/home.jsx';

FlowRouter.route('/', {
  action() {
    mount(HomePage, { content: <Home /> });
  },
});
