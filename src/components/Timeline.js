import { fbFunctions } from '../firebaseClient.js';
import { onNavigate } from '../routes.js';

const Timeline = () => {
  const container = document.createElement('div');
  const html = `<nav>
    <div>
    <img class='logo logo1 ' src='./icons&img/logo.png'> </div>
    <div id='profile' class='icons img-profile'>
    </div></nav>
  
    <div class='timeline'>
   <p></p>
   <div id='postCointainer' class='timeline posts-container'></div>
   </div>
   <div id='footer-conteiner'>
  <footer id='footer'>
  <img class='icon' id='createPost' src='./icons&img/createicon.svg'>
  </footer></div>
 
   `;

  container.innerHTML = html;
  fbFunctions.getPosts();
  fbFunctions.setWelcome();
  fbFunctions.comprobar();

  container.querySelector('#createPost').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/createpost');
  });

  return container;
};

export default Timeline;
