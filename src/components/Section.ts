import { SectionOptions } from '../types/index.d';

// components/Section.ts

export function createSection(options: SectionOptions): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section';
  if (options.className) {
    const classes = options.className.split(/\s+/).filter(Boolean);
    section.classList.add(...classes);
  }
  if (options.id) section.id = options.id;

  // Add title
  const h2 = document.createElement('h2');
  h2.textContent = options.title;
  section.appendChild(h2);

  // Add content
  if (typeof options.content === 'string') {
    const div = document.createElement('div');
    div.innerHTML = options.content;
    section.appendChild(div);
  } else if (Array.isArray(options.content)) {
    options.content.forEach(el => section.appendChild(el));
  } else if (options.content instanceof HTMLElement) {
    section.appendChild(options.content);
  }
  return section;
}