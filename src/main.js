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
  routes[window.location.pathname].template();
  fbFunctions.getUser()



});

window.onpopstate = () => {
  (routes[window.location.pathname]).template();
};


window.addEventListener('reload', ()=>{
  fbFunctions.getUser();
  fbFunctions.comprobar()
})
