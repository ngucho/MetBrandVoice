import { createNavbar } from '../components/Navbar';
import { createFooter } from '../components/Footer';

export function renderNotFound(root: HTMLElement | null) {
  if (!root) return;
  root.innerHTML = '';
  root.appendChild(createNavbar());
  const div = document.createElement('div');
  div.className = 'section';
  div.innerHTML = `<h2>Page non trouvée</h2><p>Désolé, cette page n'existe pas.</p>`;
  root.appendChild(div);
  root.appendChild(createFooter());
}