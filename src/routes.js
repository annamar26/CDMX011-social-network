import { Home } from './components/Home.js';
import { Profile } from './components/Profile.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Timeline from './components/Timeline.js';
import CreatePost from './components/CreatePost.js';
import NoUser from './components/NoUser.js';

import { render } from './utils.js';

export const routes = {
  '/': Home,
  '/signup': Signup,
  '/login': Login,
  '/timeline': Timeline,
  '/createpost': CreatePost,
  '/404': NoUser,
  '/profile': Profile,

};
export const dispatchRoute = (pathname) => {
  const root = document.getElementById('root');
  const component = routes[pathname];
  render(root, component());
};

export const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  dispatchRoute(pathname);
};
