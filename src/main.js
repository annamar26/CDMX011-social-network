/* eslint-disable no-unused-expressions */
import { home } from './components/home.js';
import signup from './components/signup.js';
import login from './components/login.js';
import timeline from './components/timeline.js';
import makePost from './components/createPost.js';
import setProfile from './components/setprofile.js';
import { fbFunctions } from './index.js';

const routes = {
  '/': home,
  '/signup': signup,
  '/login': login,
  '/timeline': timeline,
  '/createpost': makePost,
  '/profile': setProfile,
};

window.addEventListener('load', () => {
  switch (routes[window.location.pathname]) {
    case '/timeline':
      fbFunctions.comprobar();
      timeline.template();
      fbFunctions.getPosts();
      fbFunctions.setWelcome();

      break;
    case '/profile':

      setProfile.template();
      fbFunctions.getCurrentUserPosts();
      fbFunctions.setDataProfile();

      break;
    case '/createpost':
      fbFunctions.comprobar();
      makePost.template();
      break;
    default: routes[window.location.pathname].template();
  }
});

window.onpopstate = () => {
  switch (routes[window.location.pathname]) {
    case '/timeline':
      fbFunctions.comprobar();
      timeline.template();
      fbFunctions.getPosts();
      fbFunctions.setWelcome();

      break;
    case '/profile':

      setProfile.template();
      fbFunctions.getCurrentUserPosts();
      fbFunctions.setDataProfile();

      break;
    case '/createpost':
      fbFunctions.comprobar();
      makePost.template();
      break;
    default: routes[window.location.pathname].template();
  }
};

window.addEventListener('reload', () => {
  switch (routes[window.location.pathname]) {
    case '/timeline':
      fbFunctions.comprobar();
      timeline.template();
      fbFunctions.getPosts();
      fbFunctions.setWelcome();

      break;
    case '/profile':

      setProfile.template();
      fbFunctions.getCurrentUserPosts();
      fbFunctions.setDataProfile();

      break;
    case '/createpost':
      fbFunctions.comprobar();
      makePost.template();
      break;
    default: routes[window.location.pathname].template();
  }
});
