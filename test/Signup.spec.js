/**
 * @jest-environment jsdom
 */
import Signup from '../src/components/Signup.js';
import { render } from '../src/utils.js';

describe('Signup', () => {
  document.body.innerHTML = '<div id="root"></div>';
  const rootDiv = document.getElementById('root');
  it('should render Signup page', () => {
    render(rootDiv, Signup());
    expect(rootDiv).toMatchSnapshot();
  });
});
