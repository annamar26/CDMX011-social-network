/* eslint-disable import/no-cycle */
import { fbFunctions } from '../firebaseClient.js';
import { onNavigate } from '../routes.js';

const Login = () => {
  const container = document.createElement('div');
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

  container.innerHTML = html;
  container.querySelector('#googleL').addEventListener('click', (e) => {
    e.preventDefault();

    fbFunctions.googleUserSignUp(e)
      .then(() => {
        console.log('Google singin');

        onNavigate('/timeline');
        fbFunctions.createUserDoc();
        fbFunctions.getPosts();
      })
      .catch((error) => { container.querySelector('#errorMesagge1').innerHTML = error; });
  });

  container.querySelector('#return').addEventListener('click', (e) => {
    e.preventDefault();

    onNavigate('/');
  });

  container.querySelector('#seeLps').addEventListener('click', (e) => {
    e.preventDefault();
    const tipo = container.querySelector('#lgPassword');
    if (tipo.type === 'password') {
      tipo.type = 'text';
    } else {
      tipo.type = 'password';
    }
  });

  const loginData = container.querySelector('#loginForm');
  loginData.addEventListener('submit', (e) => {
    e.preventDefault();
    const loginEmail = container.querySelector('#lgEmail').value;
    const loginPassword = container.querySelector('#lgPassword').value;
    fbFunctions.userLogin(loginEmail, loginPassword).then(() => {
      console.log('Login exitoso');
      onNavigate('/timeline');
      fbFunctions.createUserDoc();
      fbFunctions.getPosts();
    })
      .catch((error) => { container.querySelector('#errorMessage1').innerHTML = error; });
  });
  return container;
};
export default Login;
