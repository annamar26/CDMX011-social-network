/**
 * @jest-environment jsdom
 */
import NoUser from '../src/components/NoUser';
import { render } from '../src/utils.js';

describe('NoUser', () => {
  document.body.innerHTML = '<div id="root"></div>';
  const rootDiv = document.getElementById('root');
  it('should render NoUser page', () => {
    render(rootDiv, NoUser());

    expect(rootDiv).toMatchSnapshot();
  });
});
