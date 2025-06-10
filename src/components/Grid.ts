// components/Grid.ts

export function createGrid(children: HTMLElement[]): HTMLElement {
  const grid = document.createElement('div');
  grid.className = 'grid';
  children.forEach(child => grid.appendChild(child));
  return grid;
}
