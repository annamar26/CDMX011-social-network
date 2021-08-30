import { fbFunctions } from './lib/index.js';

const makePost = {

  template() {
    const html = `     <div class='create-post'>
    <form id='postForm'>
    <h3>Crear publicación</h3>
    <input id='autor' type=text placeholder="Autor del libro">
    <input id='title' type=text placeholder="Titulo del libro">
    <input id='content' type=text placeholder="Escribe aqií tu reseña">
    <input id='createPost'class='button' type=submit value='Crear Publicacion'>
    </form>
    </div>`;

    document.querySelector('#root').innerHTML = html;
    const postCreated = document.querySelector('#postForm');
    postCreated.addEventListener('submit', (e) => {
      e.preventDefault();
      const bookAutor = document.getElementById('autor').value;
      const bookTitle = document.getElementById('title').value;
      const postContent = document.getElementById('content').value;

      fbFunctions.createPost(bookAutor, bookTitle, postContent)
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    });
  },
};
export default makePost
