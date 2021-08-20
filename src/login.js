/* eslint-disable import/no-cycle */
import { fbFunctions } from './lib/index.js';
import { router } from './lib/index.js';
import { home } from './home.js';
import timeline from './timeline.js';

const login = {

  template() {
    const html = `<nav>
    <img class='logo' src='logo.png'>
   
    
    </nav>
    <div class='signUp-container'>
    <h2>Inicia sesión</h2>
   
    <form class=form id=loginForm>

    <label for='lgEmail'>Email</label>
        <input id='lgEmail' type=email required>
        <label for='lgPassword'>Contraseña</label>
        <input id='lgPassword' type='password' required><img id='seeLps' src='ver.svg'>
        <input id='loginSubmit' type=submit value='Iniciar sesión'>
    </form>
    <img class='div' src='div.svg'>
    <button class='button' id='googleL'><img class='gicon' src='./googleicon.svg'>Inicia sesión con Google</button>
    <img id='return' class='return'src='./return.svg'>
    </div> `;

    document.querySelector('#root').innerHTML = html;

    document.getElementById('googleL').addEventListener('click', (e) => {
      e.preventDefault();
      fbFunctions.googleUserSignUp(e);
      fbFunctions.comprobar();
      timeline.template();
      router.onNavigate('/template');
      document.querySelector('#logout').addEventListener('click', (e) => {
        e.preventDefault();
        fbFunctions.userLogout();
      });
    });
    document.getElementById('return').addEventListener('click', (e) => {
      e.preventDefault();
      home.template();
      router.onNavigate('/');
    });
    document.querySelector('#seeLps').addEventListener('click', (e) => {
      e.preventDefault();
      const tipo = document.getElementById('lgPassword');
      if (tipo.type == 'password') {
        tipo.type = 'text';
      } else {
        tipo.type = 'password';
      }
    });

    const loginData = document.querySelector('#loginForm');
    loginData.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginEmail = document.querySelector('#lgEmail').value;
      const loginPassword = document.querySelector('#lgPassword').value;
      fbFunctions.userLogin(loginEmail, loginPassword);
      fbFunctions.comprobar();
      router.onNavigate('/template');
      timeline.template();

      document.querySelector('#logout').addEventListener('click', (e) => {
        e.preventDefault();
        fbFunctions.userLogout();
      });
    });
  },
};
export default login;
