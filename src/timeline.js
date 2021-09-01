import { fbFunctions, router } from './lib/index.js';
import makePost from './createPost.js';

const timeline = {
  template() {
    const html = `<nav class='nav-timeline'>
    <div >
    <img class='logo1 logo' src='logo.png'> </div>
    <div class='icons'>
    <img class='profile-icon icon' src='profileicon.svg'>
    <img class='edit-icon icon' id='createPost' src='editicon.svg'>
    <img class='logout-icon icon' id='logout' src='logout.svg'>
   
     </div>
  
    </nav>
   <div class='timeline'>
 
<div class='create-post'>

<p class='welcome' id='welcome'></p> </div>

    <div id='postCointainer' class='posts-container'></div>
    
  
       
       </div>`;

    const rootDiv = document.querySelector('#root');
    rootDiv.innerHTML = html;
 fbFunctions.getPosts();
 fbFunctions.setWelcome();

 

    document.getElementById('logout').addEventListener('click', (e) => {
      e.preventDefault();
      fbFunctions.userLogout().then(() => { rootDiv.querySelector('p').innerHTML = 'Logueate para ver los datos'; });
    });

    document.querySelector('#createPost').addEventListener('click', (e) => {
      e.preventDefault();
      router.onNavigate('/createPost');
      makePost.template();
    });

    return rootDiv;
  },
  welcome() {
    const user = fbFunctions.getUser();
    const welcome = document.querySelector('#welcome');
    welcome.innerHTML = `Bienvenid@ ${user.displayName ? user.displayName : user.email}`;
    return welcome;
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
