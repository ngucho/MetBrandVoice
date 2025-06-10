// components/HeroSection.ts

export function createHeroSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'hero';
  section.innerHTML = `
    <div class="hero-bg">
      <div id="vanta-bg"></div>
      <video class="hero-video" src="/assets/video/video-2.mp4" autoplay muted loop playsinline></video>
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-content">
      <h1>Rejoignez l'aventure !</h1>
      <form id="hero-form">
        <input type="email" name="heroEmail" placeholder="Votre email" required />
        <button class="cta" id="hero-contact-btn" type="submit">Get in touch</button>
      </form>
    </div>
    <img src="/assets/logo.png" class="hero-logo" alt="logo" />`;
  // Add event listener for smooth scroll
  setTimeout(() => {
    const form = section.querySelector<HTMLFormElement>('#hero-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const contact = document.getElementById('contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    });
  }, 0);

  // Lazy load Vanta.js and apply background
  setTimeout(async () => {
    const { loadScript } = await import('../utils/dom');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
    await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js');
    // @ts-ignore
    if (window.VANTA) {
      // @ts-ignore
      window.VANTA.FOG({
        el: section.querySelector('#vanta-bg'),
        highlightColor: 0xffb937,
        midtoneColor: 0x874318,
        lowlightColor: 0x170903,
        baseColor: 0x170903,
        blurFactor: 0.8,
        speed: 1.2,
        zoom: 1.0
      });
    }
  }, 0);
  return section;
}

