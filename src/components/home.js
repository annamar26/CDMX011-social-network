/* eslint-disable import/no-cycle */
import { router } from '../index.js';
import signup from './signup.js';
import login from './login.js';

export const home = {
  template: () => {
    const html = `<nav>
    <img class='logo' src='./icons&img/logo.png'>
    <img class='menu' src='./icons&img/menu.svg'/>
    
    </nav>
    <main>
<div class='main-container'>
    <div class='welcome-container'>
   
            <h1>La comunidad más grande de lectores</h1>
            
      
    </div>
    
    <div class='secondary-container'>
    <input id='loginButton' type='button' value='Inicia sesión'>
    <p>¿No tienes una cuenta?</p>
    <a id='signUpA'>Regístrate</a>
    <p id='ms'></p>
    </div>
  
</div>


</main>

`;

    document.querySelector('#root').innerHTML = html;

    document.querySelector('#signUpA').addEventListener('click', (e) => {
      e.preventDefault();
      router.onNavigate('/signup');
      signup.template();
    });

    document.querySelector('#loginButton').addEventListener('click', (e) => {
      e.preventDefault();
      router.onNavigate('/login');
      login.template();
    });
  },
};
