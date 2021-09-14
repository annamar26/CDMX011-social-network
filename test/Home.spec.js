/**
 * @jest-environment jsdom
 */
import { Home } from '../src/components/Home.js';
// import Login from '../src/components/Login.js';//
import { render } from '../src/utils.js';

describe('Home', () => {
  document.body.innerHTML = '<div id="root"></div>';
  const rootDiv = document.getElementById('root');

  // eslint-disable-next-line jest/no-focused-tests
  it.only('should render Home page', () => {
    render(rootDiv, Home());
    expect(rootDiv).toMatchSnapshot();
  });
});
