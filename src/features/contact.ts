// features/contact.ts

import { ContactFormData } from '../types/index.d';
import { validateEmail } from '../utils/validation';

export function handleContactFormSubmit(form: HTMLFormElement, callback: (data: ContactFormData) => void) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };
    if (!data.name || !data.email || !data.message) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    if (!validateEmail(data.email)) {
      alert('Email invalide.');
      return;
    }
    callback(data);
    form.reset();
  });
}
