/* import { home } from './home.js';
import { signup } from './signup.js'  */

export const fbFunctions = {

  userSignup(email, password) {
    auth

      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Registro exitoso');
      })
      .catch(() => { console.log('Error'); });
  },
  userLogin(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => { console.log('Login exitoso'); })
      .catch(() => { console.log('Error'); });
  },
  userLogout() {
    auth.signOut().then(() => { console.log('Logout exitoso'); });
  },
  googleUserSignUp(e) {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => { console.log('Google singin'); });
  },

  // posts

  comprobar() {
    auth
      .onAuthStateChanged((user) => {
        if (user) {
          fs.collection('posts')
            .get()
            .then((snapshot) => {
              fbFunctions.setupPosts(snapshot.docs);
            });
        } else {
          fbFunctions.setupPosts([]);
        }
      });
  },

  setupPosts(data) {
    const postContent = document.querySelector('.posts-container');
    let html = '';
    if (data.length) {
      data.forEach((doc) => {
        const post = doc.data();

        const li = `
          <li class="post">
          <h5>${post.title}<h5></li>
          <p>${post.content}<p></li>
          `;
        html += li;
      });
    } else {
      html = '<p>Logueate para ver los datos</p>';
    } postContent.innerHTML = html;
  },
};

export const router = {
  onNavigate(pathname) {
    window.history.pushState({},
      pathname,
      window.location.origin + pathname);
  },

};
