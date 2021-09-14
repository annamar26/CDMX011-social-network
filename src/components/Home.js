import { onNavigate } from '../routes.js';

export const Home = () => {
  const conteiner = document.createElement('div');
  const html = `<nav>
    <img class='logo' src='./icons&img/logo.png'>
   
    </nav>

    <main>
    <div class='main-container'>

    <div class='welcome-container'>
    <h1>La comunidad más grande de lectores</h1>
    </div>
    
    <div class='secondary-container'>
    <input class='login-button' id='loginButton' type='button' value='Inicia sesión'>
    <p>¿No tienes una cuenta?</p>
    <a id='signUpA'>Regístrate</a>
    <p id='ms'></p>
    </div>
  
    </div>
    </main>`;

  conteiner.innerHTML = html;

  conteiner.querySelector('#signUpA').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/signup');
  });

  conteiner.querySelector('#loginButton').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/login');
  });
  return conteiner;
};
