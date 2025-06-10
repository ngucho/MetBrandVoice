// components/Navbar.ts

export function createNavbar(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  const logoImg = document.createElement('img');
  logoImg.src = '/assets/logo.png.png'; // Use public/ path for Vite
  logoImg.alt = 'Logo MetBrandVoice';
  logoImg.style.height = '32px';
  logoImg.style.marginRight = '10px';
  nav.appendChild(logoImg);
  nav.innerHTML += `
    <a class="logo" href="#">MET<span>BrandVoice</span></a>
    <ul class="nav-links">
      <li><a href="#concept">Le concept</a></li>
      <li><a href="#valeurs">Valeurs</a></li>
      <li><a href="#previsionnel">Prévisionnel</a></li>
      <li><a href="#pourqui">Pour qui ?</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  `;
  return nav;
}