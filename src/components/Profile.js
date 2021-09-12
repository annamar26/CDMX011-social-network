/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { fbFunctions } from '../firebaseClient.js';
import { onNavigate } from '../routes.js';

export const Profile = () => {
  const container = document.createElement('div');
  const html = `<nav>
    <div>
    <img class=' logo logo1' src='./icons&img/logo.png'> </div>
    <div id='profile' class='icons img-profile'>
   <img class='logout'src='./icons&img/logout.svg'>
    </div></nav>
  
    <div class='profile-conteiner'>
    <div class='profile'>
    <h2 class='instruccion'>Configura tu perfil</h2>
  <img id='profileImage' src=''>
  <form class='profile-form'> 
 
  <label for='Nombre'>Nombre del perfil</label>
  <input id='Nombre' value='' type=text placeholder='Pablito Perez'>
  <label for='Email'>Email</label>
  <input id='Email' value='' type=text >
  <input id='photo' value='Selecciona tu foto de perfil'  type=file acept='image/*'>
 
  <button id='publicar' class='button' type=submit>Guardar Cambios</button></form>
 </div>
   <div id='postUserCointainer' class='profile-timeline posts-container'></div>
   <div id='footer-conteiner'>
  <footer id='footer'>
  <img class='icon' id='createPost' src='./icons&img/createicon.svg'>  </div>
    </footer>
    </div>`;

  container.innerHTML = html;
  fbFunctions.getCurrentUserPosts();
  fbFunctions.comprobar();
  fbFunctions.setDataProfile();

  const logout = container.querySelector('.logout');
  logout.addEventListener('click', () => {
    fbFunctions.userLogout().then(() => {
      console.log('logout exitoso');
    });
  });

  container.querySelector('#createPost').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/createpost');
  });

  const data = container.querySelector('.profile-form');
  data.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('Nombre').value;
    const email = document.getElementById('Email').value;
    const photo = document.getElementById('photo').files[0];

    fbFunctions.updateStringsProfile(name, email)
      .then(() => {
        console.log('Perfil editado');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });

    fbFunctions.pushNewPhoto(photo, photo.name)
      .then(() => {
        console.log('Perfil editado');
        fbFunctions.pullNewPhoto(photo.name).then((url) => {
          fbFunctions.updatePhotoProfile(url).then(() => {
            fbFunctions.updateUserDoc(name, email, url);
            onNavigate('/profile');
          });
        });
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  });

  return container;
};
