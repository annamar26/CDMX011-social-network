import { fbFunctions } from '../firebaseClient.js';
import { onNavigate } from '../routes.js';

const CreatePost = () => {
  const conteiner = document.createElement('div');
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
    <textarea id='content-input' type=text placeholder="Escribe aquí tu reseña. Cuenta tu experiencia con la lectura del libro que desees" maxlength="1200" required></textarea>
    <button id='publicar' class='button' type=submit>Publicar</button>
    </form>
    </div>`;

  conteiner.innerHTML = html;
  fbFunctions.setWelcome();
  fbFunctions.comprobar();
  const postCreated = conteiner.querySelector('#postForm');
  postCreated.addEventListener('submit', (e) => {
    e.preventDefault();
    const bookAutor = conteiner.querySelector('#autor').value;
    const bookTitle = conteiner.querySelector('#title').value;
    const postContent = conteiner.querySelector('#content-input').value;

    fbFunctions.createPost(bookAutor, bookTitle, postContent)
      .then(() => {
        console.log('Document successfully written!');
        fbFunctions.getPosts();
        onNavigate('/timeline');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  });
  return conteiner;
};

export default CreatePost;
