import { home } from './home.js';
import signup from './signup.js';
import login from './login.js';
import timeline from './timeline.js';
import makePost from './createPost.js';
import setProfile from './setprofile.js';
import { fbFunctions } from './lib/index.js';

const routes = {
  '/': home,
  '/signup': signup,
  '/login': login,
  '/timeline': timeline,
  '/createPost': makePost,
  '/setprofile': setProfile,
};

window.addEventListener('load', () => {
  if (routes[window.location.pathname] === '/timeline') {
    timeline.template();
    fbFunctions.getPosts()
    fbFunctions.setWelcome()
 
  
  } else {
    routes[window.location.pathname].template();
  }
});

window.onpopstate = () => {
  if (routes[window.location.pathname] === '/timeline') {
    timeline.template();
    fbFunctions.getPosts()
    fbFunctions.setWelcome()
   
  } else {
    routes[window.location.pathname].template();
  }
};

window.addEventListener('reload', () => {
  if (routes[window.location.pathname] === '/timeline') {
    timeline.template();

  } else {
    routes[window.location.pathname].template();
  }
});
