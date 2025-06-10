// components/HeroSection.ts

export function createHeroSection(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'hero';
  section.innerHTML = `
    <div class="hero-bg">
      <div id="vanta-bg"></div>
      <video class="hero-video" src="/assets/video/video-1.mp4" autoplay muted loop playsinline></video>
      <div class="hero-overlay"></div>
    </div>`;
  // Add event listener for smooth scroll
  setTimeout(() => {
    const btn = section.querySelector<HTMLButtonElement>('#hero-contact-btn');
    btn?.addEventListener('click', () => {
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