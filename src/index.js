import noUser from './components/noUser.js';
import { postConteiner } from './components/postsRender.js';
import setProfile from './components/setprofile.js';

import timeline from './components/timeline.js';

export const router = {
  onNavigate(pathname) {
    window.history.pushState({},
      pathname,
      window.location.origin + pathname);
  },

};
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
    return auth.currentUser;
  },
  setDataProfile() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setProfile.setProfile();
      }
    });
  },
  pullNewPhoto(name) {
    return storageRef.ref(`images/${name}`).getDownloadURL();
  },
  pushNewPhoto(photo, name) {
    return storageRef.ref(`/images/${name}`).put(photo).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  },

  setWelcome() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        timeline.welcome();
      }
    });
  },
  setDisplayName() {
    const user = this.getUser();
    if (user.displayName === null) {
      return user.email;
    }
    return user.displayName;
  },
  setPhotoInPost() {
    const user = this.getUser();
    if (user.photoURL != null) {
      return user.photoURL;
    }
    return null;
  },
  updateStringsProfile(name, correo) {
    const user = firebase.auth().currentUser;

    return user.updateProfile({
      displayName: name,
      email: correo,

    });
  },
  updatePhotoProfile(photo) {
    const user = firebase.auth().currentUser;

    return user.updateProfile({
      photoURL: photo,

    });
  },
  comprobar() {
    return auth.onAuthStateChanged((user) => {
      if (!user) {
        noUser.template();
      }
    });
  },
  getPosts() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('publicaciones').orderBy('fecha', 'desc')
          .get()

          .then((snapshot) => {
            postConteiner.setupPosts(snapshot.docs);
          });
      } else {
        postConteiner.setupPosts([]);
      }
    });
  },

  getCurrentUserPosts() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('publicaciones').where('uid', '==', user.uid).orderBy('fecha', 'desc')
          .get()

          .then((snapshot) => {
            postConteiner.setupPosts(snapshot.docs);
            console.log(snapshot.docs);
          });
      } else {
        postConteiner.setupPosts([]);
      }
    });
  },

  getPostToEdit(idPost) {
    const docRef = fs.collection('publicaciones').doc(idPost);

    return docRef.get();
  },

  createPost(autorLibro, titulo, content) {
    const user = this.getUser().uid;
    return fs.collection('publicaciones').doc().set({
      user: this.setDisplayName(),
      autor: autorLibro,
      title: titulo,
      fecha: new Date(),
      text: content,
      likes: [],
      userphoto: this.setPhotoInPost(),
      uid: user,
    });
  },
  updatePost(idPost, titulo, autorLibro, content) {
    const post = fs.collection('publicaciones').doc(idPost);

    return post.update({
      autor: autorLibro,
      title: titulo,
      fecha: new Date(),
      text: content,

    });
  },
  createLike(idPost, currentUser) {
    const post = fs.collection('publicaciones').doc(idPost);

    return post.update({
      likes: firebase.firestore.FieldValue.arrayUnion(currentUser),
    });
  },

  deletePost(idPost) {
    return fs.collection('publicaciones').doc(idPost).delete();
  },
  deleteLike(idPost, currentUser) {
    const post = fs.collection('publicaciones').doc(idPost);

    return post.update({
      likes: firebase.firestore.FieldValue.arrayRemove(currentUser),
    });
  },
};
