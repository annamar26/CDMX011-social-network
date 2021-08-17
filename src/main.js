import { home } from './home.js';
import signup from './signup.js';
import login from './login.js';
import posts from './posts.js';
/* import signup from './signup.js';
import login from './login.js';
import posts from './posts'; */

window.addEventListener('load', () => {
  if (window.location.pathname == '/') {
    home.template();
  } else if (window.location.pathname == '/login') {
    login.template();
  } else if (window.location.pathname == '/signup') {
    signup.template();
  } else if (window.location.pathname == '/posts') {
    posts.template();
  }
});

window.onpopstate = () => {
  if (window.location.pathname == '/') {
    home.template();
  } else if (window.location.pathname == '/login') {
    login.template();
  } else if (window.location.pathname == '/signup') {
    signup.template();
  } else if (window.location.pathname == '/posts') {
    posts.template();
  }
};
