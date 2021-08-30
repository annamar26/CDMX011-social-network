/* eslint-disable no-undef */
import { fbFunctions, router } from './lib/index.js';

import { home } from './home.js';
import timeline from './timeline.js';
import setUpProfile from './setprofile.js';

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
    <input id='sgPassword' type='password' required><img id='seeBn'class='s-button' src='ver.svg'>
    <p class='warning' id='errorMessage'></p>
    <input id='signUpSubmit' type=submit value='Crear cuenta'>
      </form>
      <img class='div' src='div.svg'>
      <button id='googleS' class='button'><img class='gicon' src='./googleicon.svg'>Regístrate con Google</button>
<img id='return' class='return'src='./return.svg'>
</div>`;

    const rootDiv = document.querySelector('#root');
    rootDiv.innerHTML = html;

    document.getElementById('googleS').addEventListener('click', (e) => {
      e.preventDefault();
      fbFunctions.googleUserSignUp(e)
        .then(() => {
          console.log('Google singin');
          fbFunctions.comprobar();
          timeline.template();
          router.onNavigate('/timeline');
        })
        .catch((error) => { document.querySelector('#errorMessage').innerHTML = error; });
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
      fbFunctions.userSignup(signupEmail, signupPassword).then((user) => {
        console.log(user)
        router.onNavigate('/timeline');
        timeline.template();
        console.log('Login exitoso');
        fbFunctions.comprobar();
   
      })
        .catch((error) => { document.getElementById('errorMessage').innerHTML = error; });

      //this.userName = document.querySelector('#username').value;
      //fbFunctions.addUserDisplayName(this.userName);
    });
    return rootDiv;
  },
};
export default signup;
