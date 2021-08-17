import { fbFunctions } from './lib/index.js';
import { router } from './lib/index.js';
import { home } from './home.js';
import posts from './posts.js';

const login = {

  template() {
    const html = `<nav>
    <img class='logo' src='logo.png'>
   
    
    </nav>
    <div class='signUp-container'>
    <h2>Inicia sesión</h2>
    <button class='button' id='googleL'><img class='gicon' src='./googleicon.svg'>Inicia sesión con Google</button>
    <form class=form id=loginForm>

    <label for='lgEmail'>Email</label>
        <input id='lgEmail' type=email required>
        <label for='lgPassword'>Contraseña</label>
        <input id='lgPassword' type=password' required>
        <input id='loginSubmit' type=submit value='Iniciar sesión'>
    </form>
    <img id='return' class='return'src='./return.svg'>
    </div> `;
  



    document.querySelector('#root').innerHTML = html;
    document.getElementById('googleL').addEventListener('click', (e) => {
      fbFunctions.googleUserSignUp(e);
      fbFunctions.comprobar();
      router.onNavigate('/posts');
      posts.template();

      document.querySelector('#logout').addEventListener('click', () => {
        fbFunctions.userLogout();
      });
    });
    document.getElementById('return').addEventListener('click', () => {
      home.template();
      router.onNavigate('/');
    });

    const loginData = document.querySelector('#loginForm');
    loginData.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginEmail = document.querySelector('#lgEmail').value;
      const loginPassword = document.querySelector('#lgPassword').value;
      fbFunctions.userLogin(loginEmail, loginPassword);
      fbFunctions.comprobar();
      router.onNavigate('/posts');
      posts.template();

      document.querySelector('#logout').addEventListener('click', () => {
        fbFunctions.userLogout();
      });
    });
  },
};
export default login;
