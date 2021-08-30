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
          <p name='id'>${doc.id}</p>
          <p>Post by: ${publicaciones.user}<p><span>at ${date}</span>
          <h2>${publicaciones.title}</h2> <p>by ${publicaciones.autor}<p>
          <p>${publicaciones.text}<p>
          <button name='like' class='like-icon' data-id='${doc.id}' id='like-${doc.id}'>Like</button>
          <p>${publicaciones.likes.length} likes <p>
          </div>
          `;

        html += li;
        postContent.innerHTML = html;

        const likes = document.querySelectorAll('.like-icon');

        for (const like of likes) {
          like.addEventListener('click', () => {
            currentidPost = like.dataset.id;
            let arrayLikes = [];
            arrayLikes = publicaciones.likes;

            if (arrayLikes.includes(currentUser.email) === false) {
              arrayLikes.push(currentUser.email);
            }

            fbFunctions.createLike(currentidPost, arrayLikes).then(() => {
              fbFunctions.comprobar();
              console.log(currentidPost);
              console.log('Like');
              console.log(arrayLikes);
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
