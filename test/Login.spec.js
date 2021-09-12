/**
 * @jest-environment jsdom
 */
import './globals/firebase';
import Login from '../src/components/Login.js';
import { render } from '../src/utils.js';

describe('Login', () => {
  document.body.innerHTML = '<div id="root"></div>';
  const rootDiv = document.getElementById('root');
  it('should render Login page', () => {
    render(rootDiv, Login);
    expect(rootDiv.contains).toMatchSnapshot();
  });
});
