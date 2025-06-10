import { createNavbar } from '../components/Navbar';
import { createHeroSection } from '../components/HeroSection';
import { createSection } from '../components/Section';
import { createCard } from '../components/Card';
import { createGrid } from '../components/Grid';
import { createContactForm } from '../components/ContactForm';
import { createFooter } from '../components/Footer';
import { SectionOptions, CardOptions } from '../types/index.d';
import { setupSectionObserver } from '../utils/animations';

export function renderHome(root: HTMLElement | null) {
  if (!root) return;
  root.innerHTML = '';

  root.appendChild(createNavbar());
  root.appendChild(createHeroSection());

  // Concept Section
  const conceptImg = document.createElement('img');
  conceptImg.src = '/public/assets/img/image-01.png';
  conceptImg.alt = 'Concept';
  const conceptText = document.createElement('div');
  conceptText.innerHTML = `
    <p>
      METBrandVoice est la première compétition artistique dédiée à la voix-off, mettant la publicité au cœur du spectacle. Chaque prestation est jugée en direct par le public.
      Ici, la publicité devient émotion, performance et engagement ! Les candidats s'affrontent sur scène, interprétant des textes publicitaires devant un public en immersion totale.
    </p>`;
  root.appendChild(createSection({
    id: 'concept',
    title: 'Un concept inédit',
    content: [conceptImg, conceptText],
    className: 'with-image image-right'
  }));

  // Valeur ajoutée - sous forme de cards dans une grille
  const valeurs: CardOptions[] = [
    {
      title: "Pour les talents",
      content: "Exposez votre voix, gagnez en visibilité et signez avec des marques.",
      bgImage: "https://source.unsplash.com/featured/?microphone"
    },
    {
      title: "Pour les marques",
      content: "Testez l'impact réel de votre message grâce à la voix, avec feedback instantané.",
      bgImage: "https://source.unsplash.com/featured/?branding"
    },
    {
      title: "Pour le public",
      content: "Votez, pariez, gagnez des lots et devenez acteur du show.",
      bgImage: "https://source.unsplash.com/featured/?audience"
    }
  ];
  const cards = valeurs.map(val => createCard(val));
  root.appendChild(createSection({
    id: 'valeurs',
    title: 'Nos valeurs et bénéfices',
    content: createGrid(cards),
    className: 'card-section'
  }));

  // Pour qui ?
  const cibleCards: CardOptions[] = [
    {
      title: 'Talents voix-off',
      content: 'Révélez votre don et rencontrez des marques prêtes à vous confier leur identité sonore.',
      icon: 'talent.svg'
    },
    {
      title: 'Marques & annonceurs',
      content: 'Mesurez l’impact de votre identité par la voix, dans un format participatif et immersif.',
      icon: 'brand.svg'
    },
    {
      title: 'Public',
      content: 'Devenez jury, votez en direct, pariez, gagnez et vivez la pub autrement.',
      icon: 'audience.svg'
    }
  ];
  const cibleElements = cibleCards.map(c => createCard(c));
  root.appendChild(createSection({
    id: 'pourqui',
    title: "À qui s'adresse METBrandVoice ?",
    content: createGrid(cibleElements),
    className: 'card-section'
  }));

  // Contact
  const contactSection = createSection({
    id: "contact",
    title: "Contact",
    content: createContactForm(),
    className: 'contact-section'
  });
  root.appendChild(contactSection);

  // Footer
  root.appendChild(createFooter());

  setupSectionObserver();
}
