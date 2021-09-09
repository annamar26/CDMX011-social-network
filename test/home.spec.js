// importamos la funcion que vamos a testear
import { home } from '../src/components/home.js';

describe('home.template', () => {
  it('should render home page', () => {
    expect(home.templete()).toBe('function');
  });
});
