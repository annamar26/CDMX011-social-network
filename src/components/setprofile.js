/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { fbFunctions } from '../index.js';

const setProfile = {
  template() {
    const html = `<nav>
    <div>
    <img class='logo1 logo' src='./icons&img/logo.png'> </div>
    <div id='profile' class='icons img-profile'>
   <img class='logout'src='./icons&img/logout.svg'>
    </div></nav>
  
    <div class='profile-conteiner'>
    <div class='profile'>
  <img id='profileImage' src=''>
  <form class='profile-form'> 
 
  <input id='Nombre' value='' type=text >
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

    const rootDiv = document.querySelector('#root');
    rootDiv.innerHTML = html;
    fbFunctions.getCurrentUserPosts();
    fbFunctions.comprobar();
    fbFunctions.setDataProfile();

    const logout = document.querySelector('.logout');
    logout.addEventListener('click', () => {
      fbFunctions.userLogout().then(() => {
        console.log('logout exitoso');
      });
    });

    const data = document.querySelector('.profile-form');
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
              setProfile.template();
            });
          });
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    });

    return rootDiv;
  },
  setProfile() {
    const photo = document.getElementById('profileImage');
    const name = document.getElementById('Nombre');
    const email = document.getElementById('Email');
    /*   const postContent = document.getElementById('content-input').value; */
    photo.src = fbFunctions.getUser() ? fbFunctions.getUser().photoURL === null ? '../icons&img/profileicon.svg' : fbFunctions.getUser().photoURL : null;
    email.value = fbFunctions.getUser() ? fbFunctions.getUser().email : null;
    name.value = fbFunctions.getUser() ? fbFunctions.getUser().displayName : null;
  },

};
export default setProfile;
