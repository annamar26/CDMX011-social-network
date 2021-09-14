/**
 * @jest-environment jsdom
 */
import { Profile } from '../src/components/Profile.js';
import { render } from '../src/utils.js';

describe('Profile', () => {
  document.body.innerHTML = '<div id="root"></div>';
  const rootDiv = document.getElementById('root');
  it('should render Profile page', () => {
    render(rootDiv, Profile());

    expect(rootDiv).toMatchSnapshot();
  });
});
