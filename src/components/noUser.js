const noUser = {

  template() {
    const html = `<nav>
      <img class='logo' src='./icons&img/logo.png'>
     
      
      </nav>
      <div class='noUser-view'>
      <h2>Debes iniciar sesion para ver el contenido de la pagina</h2>
      </div>`;

    const rootDiv = document.querySelector('#root');
    rootDiv.innerHTML = html;

    return rootDiv;
  },
};

export default noUser;
