import { fbFunctions, router } from './lib/index.js';

import { home } from './home.js';
import timeline from './timeline.js';

const signup = {
  template() {
    const html = `<nav>
    <img class='logo' src='logo.png'>
    
    </nav>
<div class='signUp-container'>
    
    <h2>Regístrate para empezar</h2>
    <form id='registerForm'>
    <label for='username'>Nombre de usuario</label>
    <input id='username' type=text  required>
    <label for='sgEmail'>Email</label>
    <input id='sgEmail' type=email required>
    <label for='sgPassword'>Contraseña</label>
    <input id='sgPassword' type='password' required><img class='s-button' src='ver.svg'>
    <p class='warning' id='ms'></p>
    <input id='signUpSubmit' type=submit value='Crear cuenta'>
      </form>
      <img class='div' src='div.svg'>
      <button id='googleS' class='button'><img class='gicon' src='./googleicon.svg'>Regístrate con Google</button>
<img id='return' class='return'src='./return.svg'>
</div>`;

    document.querySelector('#root').innerHTML = html;

    document.getElementById('googleS').addEventListener('click', (e) => {
      e.preventDefault();
      fbFunctions.googleUserSignUp(e);
      fbFunctions.comprobar();
      router.onNavigate('/timeline');

      timeline.template();
      document.querySelector('#logout').addEventListener('click', (e) => {
        e.preventDefault();
        fbFunctions.userLogout();
      });
    });
    document.getElementById('return').addEventListener('click', (e) => {
      e.preventDefault();
      router.onNavigate('/');
      home.template();
    });
    document.querySelector('.s-button').addEventListener('click', (e) => {
      e.preventDefault();

      const tipo = document.getElementById('sgPassword');
      if (tipo.type === 'password') {
        tipo.type = 'text';
      } else {
        tipo.type = 'password';
      }
    });
    const signUpData = document.querySelector('#registerForm');
    signUpData.addEventListener('submit', (e) => {
      e.preventDefault();
      const signupEmail = document.querySelector('#sgEmail').value;
      const signupPassword = document.querySelector('#sgPassword').value;
      fbFunctions.userSignup(signupEmail, signupPassword);
      fbFunctions.comprobar();
      router.onNavigate('/timeline');
      timeline.template();
    });
  },
};

export default signup;
