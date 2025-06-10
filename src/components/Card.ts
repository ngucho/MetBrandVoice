import { CardOptions } from '../types/index.d';

// components/Card.ts

export function createCard(options: CardOptions): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card';
  if (options.bgImage) {
    card.classList.add('with-bg');
    card.style.backgroundImage = `url(${options.bgImage})`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundPosition = 'center';
  }

  const inner = document.createElement('div');
  inner.className = 'card-inner';
  if (options.icon) {
    const icon = document.createElement('img');
    icon.src = `/assets/icons/${options.icon}`;
    icon.alt = '';
    icon.className = 'card-icon';
    inner.appendChild(icon);
  }
  const title = document.createElement('h3');
  title.textContent = options.title;
  inner.appendChild(title);
  const p = document.createElement('p');
  p.textContent = options.content;
  inner.appendChild(p);

  card.appendChild(inner);
  return card;
}
