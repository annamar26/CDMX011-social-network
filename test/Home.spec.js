/**
 * @jest-environment jsdom
 */
import { Home } from '../src/components/Home.js';
// import Login from '../src/components/Login.js';//
import { render } from '../src/utils.js';

describe('Home', () => {
  document.body.innerHTML = '<div id="root"></div>';
  const rootDiv = document.getElementById('root');

  it('should render Home page', () => {
    render(rootDiv, Home);
    expect(rootDiv).toMatchSnapshot();
  });
  it('button', () => {
    render(rootDiv, Home);
    console.log(rootDiv.innerHTML);
  });
});
