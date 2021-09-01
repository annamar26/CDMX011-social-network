/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
import { fbFunctions } from './lib/index.js';

let currentidPost = '';

export const postConteiner = {

  setupPosts: (data) => {
    const postContent = document.querySelector('.posts-container');
    let html = '';
    const currentUser = fbFunctions.getUser();

    if (data.length) {
      return data.forEach((doc) => {
        const publicaciones = doc.data();
        const date = publicaciones.fecha.toDate().toLocaleString();

        const li = `
          <div class='post-div' name='post'  class="one-post">
         
          <div class='post-header'><p>Post by: ${publicaciones.user} </p><span> </span><p> at ${date}</p> </div>
          <h2>${publicaciones.title} </h2> <h4> by ${publicaciones.autor}</h4>
          <p class='content'>${publicaciones.text}</p>
          <div class='buttons'><button name='like' class='like-icon' data-id='${doc.id}' id='like-${doc.id}'>Like</button>
          <p>${publicaciones.likes.length} likes </p>
          <button name='delete' class='delete-icon' data-id='${doc.id}' id='delete-${doc.id}'>Delete</button> </div></div>
          `;

        html += li;
        postContent.innerHTML = html;

        const buttons = document.querySelectorAll('.delete-icon');

        for (const button of buttons) {
          button.addEventListener('click', () => {
            currentidPost = button.dataset.id;

            fbFunctions.deletePost(currentidPost).then(() => {
              console.log('Document successfully deleted!');
              fbFunctions.getPosts();
            })
              .catch((error) => {
                console.error('Error removing document: ', error);
              });
          });
        }

        const likes = document.querySelectorAll('.like-icon');

        for (const like of likes) {
          like.addEventListener('click', () => {
            currentidPost = like.dataset.id;

            fbFunctions.createLike(currentidPost, currentUser.email).then(() => {
              fbFunctions.getPosts();
              console.log(currentidPost);
              console.log('Like');
            })
              .catch((error) => {
                console.error('Error writing like: ', error);
              });
          });
        }
      });
    }

    html = '';
    postContent.innerHTML = html;
    return postContent;
  },
};
