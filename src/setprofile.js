import signup from "./signup.js";
const setProfile = {
  template() {
    const html = `
      
      <h2>bienvenido ${signup.userName}</h2>
      
 `;

    const rootDiv = document.querySelector('#root');
    rootDiv.innerHTML = html;

    return rootDiv;
  },
};
export default setProfile;
