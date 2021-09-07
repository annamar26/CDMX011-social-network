/* eslint-disable import/no-cycle */
import { fbFunctions } from '../index.js';
import { router } from '../index.js';
import { home } from './home.js';
import timeline from './timeline.js';

const login = {

  template() {
    const html = `<nav>
    <img class='logo' src='./icons&img/logo.png'>
   
    
    </nav>
    <div class='signUp-container'>
    <h2>Inicia sesión</h2>
   
    <form class=form id=loginForm>

    <label for='lgEmail'>Email</label>
        <input id='lgEmail' type='email' required>
        <label for='lgPassword'>Contraseña</label>
        <input id='lgPassword' type='password' required><img id='seeLps' src='./icons&img/ver.svg'>
         <p class='warning' id='errorMessage1'></p>
         <input id='loginSubmit' type='submit' value='Iniciar sesión'>
      
    </form>
    <img class='div' src='./icons&img/div.svg'>
    <button class='button' id='googleL'><img class='gicon' src='./icons&img/googleicon.svg'>Inicia sesión con Google</button>
    <img id='return' class='return'src='./icons&img/return.svg'>
    </div> `;

    const rootDiv = document.querySelector('#root');
    rootDiv.innerHTML = html;

    document.getElementById('googleL').addEventListener('click', (e) => {
      e.preventDefault();
      fbFunctions.googleUserSignUp(e)
        .then(() => {
          console.log('Google singin');
          timeline.template();
          router.onNavigate('/timeline');
          fbFunctions.getPosts();
        })
        .catch((error) => { document.getElementById('errorMesagge1').innerHTML = error; });
    });

    document.getElementById('return').addEventListener('click', (e) => {
      e.preventDefault();
      home.template();
      router.onNavigate('/');
    });

    document.querySelector('#seeLps').addEventListener('click', (e) => {
      e.preventDefault();
      const tipo = document.getElementById('lgPassword');
      if (tipo.type === 'password') {
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
      fbFunctions.userLogin(loginEmail, loginPassword).then(() => {
        console.log('Login exitoso');
        timeline.template();
        router.onNavigate('/timeline');
        fbFunctions.getPosts();
      })
        .catch((error) => { document.getElementById('errorMessage1').innerHTML = error; });
    });
    return rootDiv;
  },
};
export default login;
