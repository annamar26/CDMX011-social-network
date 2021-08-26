import { fbFunctions, router } from './lib/index.js';
import { post } from './create.js';

const timeline = {

  template() {
    const html = `<nav>
    <img class='logo' src='logo.png'>
    <li id='logout'>Logout</li>
   <img id='return' class='return'src='./return.svg'>
    
    </nav>
   <div class='timeline'>
<div class='create-post'> <button class='button' id='createPost'>Crea una publicación</button></div>

    <div id='postCointainer' class='posts-container'></div>
    
  
       
       </div>`;

    document.querySelector('#root').innerHTML = html;

    fbFunctions.comprobar();

    document.querySelector('#logout').addEventListener('click', (e) => {
      e.preventDefault();
      fbFunctions.userLogout();
    });

    document.querySelector('#createPost').addEventListener('click', (e) => {
      e.preventDefault();
      router.onNavigate('/createPost');
      post.template();
    });

  

    /* fbFunctions.comprobar(); */
  },

};

/* function createPost() {
  db.collection('posts').add({
    title: 'Tokyo',
    content: 'Japan',
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
} */
export default timeline;
