import { fbFunctions, router } from '../index.js';
import makePost from './createPost.js';
import setProfile from './setprofile.js';

const timeline = {
  template() {
    const html = `<nav>
    <div>
    <img class='logo1 logo' src='./icons&img/logo.png'> </div>
    <div id='profile' class='icons img-profile'>
    </div></nav>
  
    <div class='timeline'>
   <p></p>
   <div id='postCointainer' class='timeline posts-container'></div>
   </div>
   <div id='footer-conteiner'>
  <footer id='footer'>
  <img class='icon' id='createPost' src='./icons&img/createicon.svg'>
  </footer></div>
 
   `;

    const rootDiv = document.querySelector('#root');
    rootDiv.innerHTML = html;
    fbFunctions.getPosts();
    fbFunctions.setWelcome();
    fbFunctions.comprobar();

    rootDiv.querySelector('#createPost').addEventListener('click', (e) => {
      e.preventDefault();
      router.onNavigate('/createpost');
      makePost.template();
    });

    return rootDiv;
  },
  welcome() {
    const user = fbFunctions.getUser();
    const welcome = document.querySelector('.img-profile');
    console.log(user.photoURL);
    if (user.photoURL != null) {
      welcome.innerHTML = `<img class='profile-icon photo-user' id='user-edit' src='${user.photoURL}'>`;
    } else {
      welcome.innerHTML = '<img class="icon profile-icon"id="user-edit" src="./icons&img/profileicon.svg">';
    }
    welcome.addEventListener('click', () => {
      router.onNavigate('/profile');
      setProfile.template();
    });

    console.log(welcome);
    return welcome;
  },

};

export default timeline;
