/**
 * @jest-environment jsdom
 */
import Timeline from '../src/components/Timeline';
import { render } from '../src/utils.js';

describe('Timeline', () => {
  document.body.innerHTML = '<div id="root"></div>';
  const rootDiv = document.getElementById('root');
  it('should render Timeline page', () => {
    render(rootDiv, Timeline);

    expect(rootDiv.innerHTML).toMatchSnapshot();
  });
});
