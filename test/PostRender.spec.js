/**
 * @jest-environment jsdom
 */
import { setUpPosts } from '../src/components/PostsRender.js';
import { render } from '../src/utils.js';

describe('SetUpPosts', () => {
  document.body.innerHTML = '<div id="root"></div>';
  const rootDiv = document.getElementById('root');

  it('should render Home page', () => {
    render(rootDiv, setUpPosts());
    expect(rootDiv).toMatchSnapshot();
  });
});
