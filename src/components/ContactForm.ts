import { handleContactFormSubmit } from '../features/contact';

export function createContactForm(): HTMLElement {
  const form = document.createElement('form');
  form.id = 'contactForm';
  form.innerHTML = `
    <label>
      <span>Nom</span>
      <input type="text" name="name" placeholder="Nom" required />
    </label>
    <label>
      <span>Email</span>
      <input type="email" name="email" placeholder="Email" required />
    </label>
    <label>
      <span>Votre message</span>
      <textarea name="message" placeholder="Votre message" required></textarea>
    </label>
    <button class="cta" type="submit">Envoyer</button>
  `;
  handleContactFormSubmit(form, (data) => {
    alert('Merci pour votre message, ' + data.name + ' ! Nous vous recontacterons rapidement.');
    // Ici tu pourrais faire un vrai envoi d’email côté serveur plus tard
  });
  return form;
}