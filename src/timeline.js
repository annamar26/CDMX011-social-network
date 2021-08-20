import { fbFunctions, router } from './lib/index.js';

const timeline = {

  template() {
    const html = `<nav>
    <img class='logo' src='logo.png'>
    <li id='logout'>Logout</li>
   
    
    </nav>
    <div class='createPost'>

    <div class='posts-container'>
  
       </div>`;

    document.querySelector('#root').innerHTML = html;

    fbFunctions.comprobar();
    document.querySelector('#logout').addEventListener('click', (e) => {
      e.preventDefault();
      fbFunctions.userLogout();
    });
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
