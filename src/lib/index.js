import { postConteiner } from '../postsRender.js';

export const fbFunctions = {
  userSignup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  },
  userLogin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  },
  userLogout() {
    return auth.signOut();
  },
  googleUserSignUp() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  },
  getUser() {
    console.log(auth.currentUser)
    return auth.currentUser;
  },
 /* addUserDisplayName(userName) {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: userName,
      // photoURL: "https://example.com/jane-q-user/profile.jpg"

    });
console.log(user);
    return user;
  },*/

  // posts

  comprobar() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('publicaciones')
          .get()

          .then((snapshot) => {
            postConteiner.setupPosts(snapshot.docs);
                        });
      } else {
        postConteiner.setupPosts([]);

      }
    });
  },

  createPost(autorLibro, titulo, content) {
    return fs.collection('publicaciones').doc().set({
      user: this.getUser().email,
      autor: autorLibro,
      title: titulo,
      fecha: new Date(),
      text: content,
      likes: [],
    });
  },

  createLike(idPost, nuevoArrayLikes) {
    return fs.collection('publicaciones').doc(idPost).update({

      likes: nuevoArrayLikes,
    });
  },
};

export const router = {
  onNavigate(pathname) {
    window.history.pushState({},
      pathname,
      window.location.origin + pathname);
  },

};
