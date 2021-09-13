/* eslint-disable no-undef */
import { fbFunctions } from '../firebaseClient.js';
import { onNavigate } from '../routes.js';

const signup = () => {
  const container = document.createElement('div');
  const html = `<nav><div>
    <img class='logo logo1' src='./icons&img/logo.png'></div>
   
    </nav>
<div class='signUp-container'>
    
    <h2>Regístrate para empezar</h2>
    <form id='registerForm'>
      <label for='sgEmail'>Email</label>
    <input id='sgEmail' type=email required>
    <label for='sgPassword'>Contraseña</label>
    <input id='sgPassword' type='password' required><img class='s-button' src='./icons&img/ver.svg'>
    <p class='warning' id='errorMessage'></p>
    <input id='signUpSubmit' type=submit value='Crear cuenta'>
      </form>
      <img class='div' src='./icons&img/div.svg'>
      <button id='googleS' class='button'><img class='gicon' src='./icons&img/googleicon.svg'>Regístrate con Google</button>
<img id='return' class='return'src='./icons&img/return.svg'>
</div>`;

  container.innerHTML = html;

  container.querySelector('#googleS').addEventListener('click', (e) => {
    e.preventDefault();
    fbFunctions.googleUserSignUp(e)
      .then(() => {
        onNavigate('/timeline');
        fbFunctions.getPosts();
        fbFunctions.createUserDoc();
      })
      .catch((error) => { container.querySelector('#errorMessage').innerHTML = error; });
  });

  container.querySelector('#return').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/');
  });

  container.querySelector('.s-button').addEventListener('click', (e) => {
    e.preventDefault();

    const tipo = container.querySelector('#sgPassword');
    if (tipo.type === 'password') {
      tipo.type = 'text';
    } else {
      tipo.type = 'password';
    }
  });

  const signUpData = container.querySelector('#registerForm');
  signUpData.addEventListener('submit', (e) => {
    e.preventDefault();
    const signupEmail = container.querySelector('#sgEmail').value;
    const signupPassword = container.querySelector('#sgPassword').value;
    fbFunctions.userSignup(signupEmail, signupPassword).then(() => {
      onNavigate('/profile');
      fbFunctions.getCurrentUserPosts();
      fbFunctions.createUserDoc();
    })
      .catch((error) => { container.querySelector('#errorMessage').innerHTML = error; });
  });
  return container;
};
export default signup;
