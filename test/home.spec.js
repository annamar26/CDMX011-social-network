/**
 * @jest-environment jsdom
 */
import { home } from '../src/components/home.js';

describe('home.template', () => {
  it('should render home page', () => {
    const renderizado = home.template();
    console.log(renderizado);
  });
});
