import { onNavigate } from "../routes.js";

const noUser = () => {
  const conteiner = document.createElement('div');

  const html = `<nav>
      <img class='logo' src='./icons&img/logo.png'>
     
      
      </nav>
      <div class='noUser-view signUp-container'>
      <h2>Debes iniciar sesion para ver el contenido de la pagina</h2>
      <br>
      <br>
      <input id='loginSubmit' class='button' type=button value='Inicia Sesión'>
      </div>`;

  conteiner.innerHTML = html;
  const volver = conteiner.querySelector('#loginSubmit');
  volver.addEventListener('click', ()=>{
    onNavigate('/login');
  });

  return conteiner;
};

export default noUser;
