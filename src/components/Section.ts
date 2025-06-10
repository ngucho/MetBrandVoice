import { SectionOptions } from '../types/index.d';

// components/Section.ts

export function createSection(options: SectionOptions): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section';
  if (options.id) section.id = options.id;

  section.innerHTML = `<h2>${options.title}</h2>`;
  if (typeof options.content === 'string') {
    section.innerHTML += options.content;
  } else if (Array.isArray(options.content)) {
    options.content.forEach(el => section.appendChild(el));
  } else if (options.content instanceof HTMLElement) {
    section.appendChild(options.content);
  }
  return section;
}