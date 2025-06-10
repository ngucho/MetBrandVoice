// components/Navbar.ts

export function createNavbar(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `
    <a class="logo" href="#">MET<span>BrandVoice</span></a>
    <ul class="nav-links">
      <li><a href="#previsionnel">Prévisionnel</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  `;
  return nav;
}