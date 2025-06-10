// components/HeroSection.ts

export function createHeroSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'hero';
  section.innerHTML = `
    <div class="hero-content">
      <h1>METBrandVoice</h1>
      <h2>La plus belle voix de marque</h2>
      <p>Le show qui transforme la publicité en art, révélant les talents voix-off et offrant aux marques une scène émotionnelle unique.</p>
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