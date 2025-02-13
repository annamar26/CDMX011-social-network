/* eslint-disable consistent-return */

import { fbFunctions } from '../firebaseClient.js';
import { onNavigate } from '../routes.js';

export const setUpPosts = (data) => {
  const conteiner = document.createElement('div');
  conteiner.innerHTML = '<div class="posts-container"></div>';
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
         <div id='user' class='post-header'> 
         <div class='div-user'>  
         <img class='photo-user user-post' data-id=${publicaciones.uid} src=''><p id='nombre' class='user' data-id=${publicaciones.uid}></p></div> 
         <div class='fecha'>
         <p >${date}</p> </div>
         </div>
         <div class='post-autor'>
          <h2>${publicaciones.title} </h2> <h4> de ${publicaciones.autor}</h4></div>
          <div class='content'>
          <p class='content-text'>${publicaciones.text}</p></div>
          <div class='image-div'>
          <img data-image='${publicaciones.photoInPost}'id='photoPost' class='photo-In-Post'>
        </div>
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
      const photoPosts = document.querySelectorAll('#photoPost');
      for (const photoPost of photoPosts) {
        photoPost.src = `${photoPost.dataset.image === `${null}` ? '../icons&img/divisor.svg' : `${photoPost.dataset.image}`}`;
        if (photoPost.dataset.image === `${null}`) {
          photoPost.classList.add('hidden');
        }
        photoPost.src = `${photoPost.dataset.image === `${undefined}` ? '../icons&img/divisor.svg' : `${photoPost.dataset.image}`}`;
        if (photoPost.dataset.image === `${undefined}`) {
          photoPost.classList.add('hidden');
        }
      }

      const names = document.querySelectorAll('#nombre');
      for (const name of names) {
        fs.collection('users').doc(name.dataset.id).get()
          .then((user) => {
            let userName = user.data().displayName;
            if (userName === undefined || userName === null) {
              userName = user.data().email;
            }
            name.innerHTML = userName;
          });
      }
      const photos = document.querySelectorAll('.user-post');

      for (const photo of photos) {
        fs.collection('users').doc(photo.dataset.id).get()
          .then((user) => {
            const photoUser = user.data().photoURL;
            if (photoUser === undefined || photoUser === null) {
              photo.src = './icons&img/profileicon.svg';
            }
            photo.src = photoUser;
          });
      }

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
            })
              .catch(() => {

              });
          } else {
            currentidPost = like.dataset.id;

            fbFunctions.createLike(currentidPost, currentUser.email).then(() => {
              fbFunctions.getPosts();
            })
              .catch(() => {

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
                fbFunctions.getPosts();
              })
                .catch(() => {

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
                   <input id='photo' value='Sube la foto de portada del libro que reseñas'  type=file acept='image/*'>
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
                  const image = document.getElementById('photo').files[0];
                  if (image === undefined) {
                    fbFunctions.updatePost(currentidPost, bookAutor, bookTitle, postContent)
                      .then(() => {
                        onNavigate('/timeline');
                      })
                      .catch(() => {

                      });
                  } else {
                    fbFunctions.pushNewPhoto(image, image.name)
                      .then(() => {
                        fbFunctions.pullNewPhoto(`${image.name}`).then((url) => {
                          fbFunctions.updatePhotoPost(currentidPost, url)
                            .then(() => {
                              onNavigate('/timeline');
                            })
                            .catch(() => {

                            });
                        });
                      })
                      .catch(() => {

                      });
                  }
                });
                return rootDiv;
              })

              .catch(() => {

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
  return conteiner;
};
