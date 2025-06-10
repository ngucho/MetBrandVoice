// components/HeroSection.ts

export function createHeroSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'hero';
  section.innerHTML = `
    <div class="hero-content">
      <h1>METBrandVoice</h1>
      <h2>See Beyond Advertising</h2>
      <p>Le show qui transcende la publicité en révélant les talents voix‑off et en offrant aux marques une scène immersive.</p>
      <button class="cta" id="hero-contact-btn">Contactez-nous</button>
    </div>
    <div class="hero-image img-placeholder"></div>
  `;
  // Add event listener for smooth scroll
  setTimeout(() => {
    const btn = section.querySelector<HTMLButtonElement>('#hero-contact-btn');
    btn?.addEventListener('click', () => {
      const contact = document.getElementById('contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    });
  }, 0);
  return section;
}