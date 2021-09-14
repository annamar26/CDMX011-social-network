import { dispatchRoute, onNavigate } from './routes.js';
import { fbFunctions } from './firebaseClient.js';

export const setProfile = () => {
  const photo = document.getElementById('profileImage');
  const name = document.getElementById('Nombre');
  const email = document.getElementById('Email');
  /*   const postContent = document.getElementById('content-input').value; */
  photo.src = fbFunctions.getUser() ? fbFunctions.getUser().photoURL === null ? '../icons&img/profileicon.svg' : fbFunctions.getUser().photoURL : null;
  email.value = fbFunctions.getUser() ? fbFunctions.getUser().email : null;
  name.value = fbFunctions.getUser() ? fbFunctions.getUser().displayName : null;
};

export const welcome = () => {
  const user = fbFunctions.getUser();
  const welcome = document.querySelector('#profile');

  if (user.photoURL != null) {
    welcome.innerHTML = `<div class='nameInWelcome'><img class='profile-icon photo-user' id='user-edit' src='${user.photoURL}'><p>Perfil</p></div>`;
  } else {
    welcome.innerHTML = '<div class="nameInWelcome"><img class="icon profile-icon"id="user-edit" src="./icons&img/profileicon.svg"><p>Perfil</p></div>';
  }
  welcome.addEventListener('click', () => {
    onNavigate('/profile');
    setProfile();
  });

  return welcome;
};

const logoReturn = () => {
  const logo = document.querySelector('.logo');

  logo.addEventListener('click', () => {
    onNavigate('/');
  });
};

window.addEventListener('load', () => {
  dispatchRoute(window.location.pathname);
  logoReturn();
});

window.onpopstate = () => {
  dispatchRoute(window.location.pathname);
  logoReturn();
};
window.addEventListener('reload', () => {
  dispatchRoute(window.location.pathname);
  logoReturn();
});