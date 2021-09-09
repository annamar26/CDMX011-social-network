import { fbFunctions, router } from '../index.js';
import timeline from './timeline.js';

export const postConteiner = {

  setupPosts: (data) => {
    const postContent = document.querySelector('.posts-container');
    let html = '';
    const currentUser = fbFunctions.getUser();

    let currentidPost = '';
    if (data.length) {
      return data.forEach((doc) => {
        const publicaciones = doc.data();
        const date = publicaciones.fecha.toDate().toLocaleString();

        const li = `
         <div class='post-div'>
         <div class='post-header'>
         <div class='div-user'><img class='photo-user user-post' src='${publicaciones.userphoto ? publicaciones.userphoto : './icons&img/profileicon.svg'}'><p class='user'>${publicaciones.user}</p></div>
         <div class='fecha'>
         <p >${date}</p> </div>
         </div>
         <div class='post-autor'>
          <h2>${publicaciones.title} </h2> <h4> de ${publicaciones.autor}</h4></div>
          <div class='content'>
          <p class='content-text'>${publicaciones.text}</p></div>
         
          <div class='like-buttons post-header '>
          <img class='post-icon' src='' data-id='${doc.id}' data-likes='${publicaciones.likes}' id='like-${doc.id}'>
          <a class='tooltip' title='${publicaciones.likes}'>${publicaciones.likes.length} likes </a></div>
          
          <div class='delete-buttons post-header '>
          <img src='' class='delete' data-uid=${publicaciones.uid} data-id='${doc.id}' id='delete-${doc.id}'>
          <img src='' class='edit' data-uid=${publicaciones.uid} data-id='${doc.id}' id='edit-${doc.id}'>
          </div>
          
          </div>
          `;

        html += li;
        postContent.innerHTML = html;

        const likes = document.querySelectorAll('.post-icon');

        for (const like of likes) {
          if (like.dataset.likes.includes(currentUser.email) === true) {
            like.src = './icons&img/likedicon.svg';
          } else {
            like.src = './icons&img/likeicon.svg';
          }
          like.addEventListener('click', () => {
            if (like.dataset.likes.includes(currentUser.email) === true) {
              currentidPost = like.dataset.id;

              fbFunctions.deleteLike(currentidPost, currentUser.email).then(() => {
                fbFunctions.getPosts();

                console.log(currentidPost);
                console.log('dislike');
              })
                .catch((error) => {
                  console.error('Error writing like: ', error);
                });
            } else {
              currentidPost = like.dataset.id;

              fbFunctions.createLike(currentidPost, currentUser.email).then(() => {
                fbFunctions.getPosts();
                console.log(currentidPost);
                console.log('Like');
              })
                .catch((error) => {
                  console.error('Error writing like: ', error);
                });
            }
          });
        }

        const buttons = document.querySelectorAll('.delete');
        for (const button of buttons) {
          if (button.dataset.uid === currentUser.uid) {
            button.src = './icons&img/deleteicon.svg';

            button.addEventListener('click', () => {
              currentidPost = button.dataset.id;
              const result = confirm('¿Estás seguro de que quieres eliminar esta publicación?');
              if (result === true) {
                fbFunctions.deletePost(currentidPost).then(() => {
                  console.log('Document successfully deleted!');
                  fbFunctions.getPosts();
                })
                  .catch((error) => {
                    console.error('Error removing document: ', error);
                  });
              }
            });
          } else {
            button.src = '';
          }
        }

        const edits = document.querySelectorAll('.edit');
        for (const edit of edits) {
          if (edit.dataset.uid === currentUser.uid) {
            edit.src = './icons&img/editicon.svg';

            edit.addEventListener('click', () => {
              currentidPost = edit.dataset.id;
              const post = fbFunctions.getPostToEdit(currentidPost)
                .then((doc) => {
                  doc.data();

                  html = `  <nav>
                  <div>
                  <img class='logo' src='./icons&img/logo.png'></div>
                  <div id='profile' class='icons img-profile'>
                  </div>
                     </nav>
                     <div class='edit-post create-post'>
                  <form id='postForm'>
                  <h3>Edita tu publicación</h3>
                  <input id='autor' value='${doc.data().autor}' type=text placeholder="Autor del libro" required>
                  <input id='title' value='${doc.data().title}' type=text placeholder="Titulo del libro" required>
                  <textarea id='content-input'  type=text placeholder="Escribe aqií tu reseña" maxlength="1200" required>${doc.data().text}</textarea>
                  <button id='publicar' class='button' type=submit>Guardar Cambios</button>
                  </form>
                  </div>`;

                  const rootDiv = document.querySelector('#root');
                  rootDiv.innerHTML = html;
                  fbFunctions.setWelcome();
                  const autor = rootDiv.querySelector('#autor');
                  autor.setAttribute = ('value', post.autor);
                  const editedPost = document.querySelector('#postForm');
                  editedPost.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const bookAutor = document.getElementById('autor').value;
                    const bookTitle = document.getElementById('title').value;
                    const postContent = document.getElementById('content-input').value;

                    fbFunctions.updatePost(edit.dataset.id, bookAutor, bookTitle, postContent)
                      .then(() => {
                        console.log('Document successfully updated!');
                        timeline.template();
                      })
                      .catch((error) => {
                        console.error('Error updated document: ', error);
                      });
                  });
                  return rootDiv;
                })

                .catch((error) => {
                  console.log('Error getting document:', error);
                });
            });
          } else {
            edit.src = '';
          }
        }
      });
    }

    html = '';
    postContent.innerHTML = html;
    return postContent;
  },

};
