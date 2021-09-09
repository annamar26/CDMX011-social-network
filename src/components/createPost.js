import { fbFunctions, router } from '../index.js';
import timeline from './timeline.js';

const makePost = {

  template() {
    const html = `  <nav>
    <div>
    <img class='logo' src='./icons&img/logo.png'></div>
    <div id='profile' class='icons img-profile'>
    </div>
       </nav>
       <div class='create-post'>
    <form id='postForm'>
    <h3>Crear publicación</h3>
    <input id='autor' type=text placeholder="Autor del libro" required>
    <input id='title' type=text placeholder="Titulo del libro" required>
    <textarea id='content-input' type=text placeholder="Escribe aqií tu reseña" maxlength="1200" required></textarea>
    <button id='publicar' class='button' type=submit>Publicar</button>
    </form>
    </div>`;

    document.querySelector('#root').innerHTML = html;
    fbFunctions.setWelcome();
    fbFunctions.comprobar();
    const postCreated = document.querySelector('#postForm');
    postCreated.addEventListener('submit', (e) => {
      e.preventDefault();
      const bookAutor = document.getElementById('autor').value;
      const bookTitle = document.getElementById('title').value;
      const postContent = document.getElementById('content-input').value;

      fbFunctions.createPost(bookAutor, bookTitle, postContent)
        .then(() => {
          console.log('Document successfully written!');
          fbFunctions.getPosts();
          router.onNavigate('/timeline');
          timeline.template();
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    });
  },
  welcome() {
    const user = fbFunctions.getUser();
    const welcome = document.querySelector('.img-profile');
    console.log(user.photoURL);
    if (user.photoURL != null) {
      welcome.innerHTML = `<img class='profile-icon photo-user' src='${user.photoURL}'>`;
    } else {
      welcome.innerHTML = '<img class="icon profile-icon" src="../icons&img/profileicon.svg">';
    }

    console.log(welcome);
    return welcome;
  },

};
export default makePost;
