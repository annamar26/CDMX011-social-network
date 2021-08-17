import { fbFunctions } from './lib/index.js';
import { home } from './home.js';

const posts = {

  template() {
    const html = `<nav>
    <img class='logo' src='logo.png'>
    <li id='logout'>Logout</li>
   
    
    </nav>
    <div class='posts-container'>
  
       </div>`;

    document.querySelector('#root').innerHTML = html;
    document.querySelector('#logout').addEventListener('click', () => {
      fbFunctions.userLogout();
    });
    fbFunctions.comprobar();
    },

};

export default posts;
