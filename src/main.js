import { home } from './home.js';
import signup from './signup.js';
import login from './login.js';
import timeline from './timeline.js';

const routes = {
  '/': home,
  '/signup': signup,
  '/login': login,
  '/timeline': timeline,
};

window.addEventListener('load', () => {
  (routes[window.location.pathname]).template();
});

window.onpopstate = () => {
  (routes[window.location.pathname]).template();
};



