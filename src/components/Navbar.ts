// components/Navbar.ts

export function createNavbar(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `
    <ul class="nav-links">
      <li><a href="#previsionnel">Prévisionnel</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  `;
  return nav;
}