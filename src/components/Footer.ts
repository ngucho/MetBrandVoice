// components/Footer.ts

export function createFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    © 2024 METBrandVoice. Tous droits réservés. – <a href="mailto:contact@metbrandvoice.com">contact@metbrandvoice.com</a>
  `;
  return footer;
}