export function render(target, element) {
  while (target.firstChild) {
    target.removeChild(target.lastChild);
  }

  target.append(element);
}
