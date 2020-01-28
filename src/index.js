import React from 'react';
import { render } from 'react-dom';

import './index.scss';

import Application from './components/Application';
import PostsProvider from './components/providers/PostsProvider'
import UserProvider from './components/providers/UserProvider';

render(
  <UserProvider>
    <PostsProvider>
      <Application />
    </PostsProvider>
  </UserProvider>
  ,document.getElementById('root'));