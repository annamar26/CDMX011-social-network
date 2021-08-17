import { router } from './lib/index.js';
import signup from './signup.js';
import login from './login.js';

export const home = {
  template: () => {
    const html = `<nav>
    <img class='logo' src='logo.png'>
    <img class='menu' src='menu.svg'/>
    
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
<footer></footer>
`;

    document.querySelector('#root').innerHTML = html;
    router.onNavigate('/');
    document.querySelector('#signUpA').addEventListener('click', () => {
      router.onNavigate('/signup');
      signup.template();
    });

    document.querySelector('#loginButton').addEventListener('click', () => {
      router.onNavigate('/login');
      login.template();
    });
  },
};
