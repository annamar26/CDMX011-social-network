import { fbFunctions } from './lib/index.js';
import { router } from './lib/index.js';
import { home } from './home.js';
import posts from './posts.js';

const signup = {
  template() {
    const html = `<nav>
    <img class='logo' src='logo.png'>
    
    </nav>
<div class='signUp-container'>
    
    <h2>Regístrate para empezar</h2>
    <button id='googleS' class='button'><img class='gicon' src='./googleicon.svg'>Regístrate con Google</button>
    <form id='registerForm'>
    <label for='username'>Nombre de usuario</label>
    <input id='username' type=text  required>
    <label for='sgEmail'>Email</label>
    <input id='sgEmail' type=email required>
    <label for='sgPassword'>Contraseña</label>
    <input id='sgPassword' type=password required>
    <p class='warning' id='ms'></p>
    <input id='signUpSubmit' type=submit value='Crear cuenta'>
      </form>
<img id='return' class='return'src='./return.svg'>
</div>`;

    document.querySelector('#root').innerHTML = html;
    document.getElementById('googleS').addEventListener('click', (e) => {
      fbFunctions.googleUserSignUp(e);
      fbFunctions.comprobar();
      router.onNavigate('/posts');
      posts.template();
      document.querySelector('#logout').addEventListener('click', () => {
        fbFunctions.userLogout();
      });
    });
    document.getElementById('return').addEventListener('click', () => {
      router.onNavigate('/');
      home.template();

    });
    const signUpData = document.querySelector('#registerForm');
    signUpData.addEventListener('submit', (e) => {
      e.preventDefault();
      const signupEmail = document.querySelector('#sgEmail').value;
      const signupPassword = document.querySelector('#sgPassword').value;
      fbFunctions.userSignup(signupEmail, signupPassword);
      fbFunctions.comprobar();
      router.onNavigate('/posts');
      posts.template();
    });
  },
};

export default signup;
