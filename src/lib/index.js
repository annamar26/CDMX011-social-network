export const fbFunctions = {
  currentUser: '',
  currentidPost: '',

  userSignup(email, password) {
    auth

      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Registro exitoso');
      })
      .catch((error) => { console.log('Error'); });
  },
  userLogin(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Login exitoso');
      })
      .catch(() => { console.log('Error'); });
  },
  userLogout() {
    auth.signOut().then(() => { console.log('Logout exitoso'); });
  },
  googleUserSignUp() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => { console.log('Google singin'); });
  },

  // posts

  comprobar() {
    auth
      .onAuthStateChanged((user) => {
        if (user) {
          fs.collection('publicaciones')
            .get()
            .then((snapshot) => {
              fbFunctions.setupPosts(snapshot.docs);
              console.log(user.uid);
              this.currentUser = user.uid;
            });
        } else {
          fbFunctions.setupPosts([]);
        }
      });
  },

  createPost(autorLibro, titulo, content) {
    fs.collection('publicaciones').doc().set({
      user: this.currentUser,
      autor: autorLibro,
      title: titulo,
      fecha: new Date(),
      text: content,
      likes: [],
    })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  },

  setupPosts(data) {
    const postContent = document.querySelector('.posts-container');
    let html = '';
    if (data.length) {
      data.forEach((doc) => {
        const publicaciones = doc.data();
        const date = publicaciones.fecha.toDate().toLocaleString();

        const li = `
          <div class='post-div' name='post'  class="one-post">
          <p name='id'>${doc.id}</p>
          <p>Post by: ${publicaciones.user}<p><span>at ${date}</span>
          <h2>${publicaciones.title}</h2> <p>by ${publicaciones.autor}<p>
          <p>${publicaciones.text}<p>
          <button name='like' class='like-icon' data-id='${doc.id}' id='like-${doc.id}'>Like</button>
          </div>
          `;
        html += li;
        postContent.innerHTML = html;
      });
    } else {
      html = '<p>Logueate para ver los datos</p>';

      postContent.innerHTML = html;
    } const likes = document.querySelectorAll('.like-icon');
    for (const like of likes) {
      like.addEventListener('click', () => {
        console.log(like.dataset.id);
      });
    }
  },

  createLike() {
    const postsId = this.postContent.dataset.example;
    fs.collection('publicaciones').doc(postsId).set({

      likes: [this.currentUser],
    })
      .then(() => {
        console.log('Like', postsId);
      })
      .catch((error) => {
        console.error('Error writing like: ', error);
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
