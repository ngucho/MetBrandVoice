import { CardOptions } from '../types/index.d';

// components/Card.ts

export function createCard(options: CardOptions): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h3>${options.title}</h3>
    <p>${options.content}</p>
  `;
  return card;
}