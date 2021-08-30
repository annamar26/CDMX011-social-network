import { fbFunctions, router } from './lib/index.js';
import makePost from './createPost.js';

const timeline = {
  template() {
    const user = fbFunctions.getUser();
    const html = `<nav>
    <div>
    <img class='logo' src='logo.png'>
    <li id='logout'>Logout</li>
     </div>
     <div>

    <li id='logout'>Perfil de usuario</li>
    <li id='logout'>Crear una publicacion</li>
    </div>
    </nav>
   <div class='timeline'>
 
<div class='create-post'>
<button class='button' id='createPost'>Crea una publicación</button>  
<p id='welcome'>${user.displayName ? user.displayName : user.email} </p> </div>

    <div id='postCointainer' class='posts-container'></div>
    
  
       
       </div>`;

    const rootDiv = document.querySelector('#root')
    rootDiv.innerHTML = html;
    fbFunctions.comprobar();
   fbFunctions.getUser()

    document.getElementById('logout').addEventListener('click', (e) => {
      e.preventDefault();
      fbFunctions.userLogout().then(() => { rootDiv.querySelector('p').innerHTML = 'Logueate para ver los datos'});
    });

    document.querySelector('#createPost').addEventListener('click', (e) => {
      e.preventDefault();
      router.onNavigate('/createPost');
      makePost.template();
    });
 return rootDiv },

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
