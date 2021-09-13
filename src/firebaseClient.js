import noUser from './components/NoUser.js';
import { setUpPosts } from './components/PostsRender.js';
import { setProfile, welcome } from './main.js';
import { render } from './utils.js';

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
        setProfile();
      }
    });
  },
  pullNewPhoto(name) {
    return storageRef.ref(`images/${name}`).getDownloadURL();
  },
  pushNewPhoto(photo, name) {
    return storageRef.ref(`/images/${name}`).put(photo).then(() => {

    });
  },

  setWelcome() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        welcome();
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
  updateUserDoc(name, correo, photo) {
    const user = fs.collection('users').doc(this.getUser().uid);

    return user.update({
      displayName: name,
      email: correo,
      photoURL: photo,

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
        const root = document.getElementById('root');

        render(root, noUser());
      }
    });
  },
  getPosts() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('publicaciones').orderBy('fecha', 'desc')
          .get()

          .then((snapshot) => {
            setUpPosts(snapshot.docs);
          });
      } else {
        setUpPosts([]);
      }
    });
  },

  getCurrentUserPosts() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('publicaciones').where('uid', '==', user.uid).orderBy('fecha', 'desc')
          .get()

          .then((snapshot) => {
            setUpPosts(snapshot.docs);
          });
      } else {
        setUpPosts([]);
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
  userPost(uid) {
    return fs.collection('users').doc(uid).get();
  },
  createUserDoc() {
    return fs.collection('users').doc(fbFunctions.getUser().uid)

      .get().then((doc) => {
        if (!doc.exists) {
          fs.collection('users').doc(fbFunctions.getUser().uid).set({
            displayName: fbFunctions.getUser().displayName,
            photoURL: fbFunctions.getUser().photoURL,
            email: fbFunctions.getUser().email,
            uid: fbFunctions.getUser().uid,
          });
        }
      });
  },
};
