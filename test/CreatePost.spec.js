/**
 * @jest-environment jsdom
 */
import CreatePost from '../src/components/CreatePost.js';
import { render } from '../src/utils.js';

describe('Create Post', () => {
  document.body.innerHTML = '<div id="root"></div>';
  const rootDiv = document.getElementById('root');
  it('should render Create Post page', () => {
    render(rootDiv, CreatePost());

    expect(rootDiv).toMatchSnapshot();
  });
});
