import { createNavbar } from '../components/Navbar';
import { createHeroSection } from '../components/HeroSection';
import { createSection } from '../components/Section';
import { createCard } from '../components/Card';
import { createGrid } from '../components/Grid';
import { createContactForm } from '../components/ContactForm';
import { createFooter } from '../components/Footer';
import { SectionOptions, CardOptions } from '../types/index.d';

export function renderHome(root: HTMLElement | null) {
  if (!root) return;
  root.innerHTML = '';

  root.appendChild(createNavbar());
  root.appendChild(createHeroSection());

  // Concept Section
  root.appendChild(createSection({
    id: "concept",
    title: "Un concept inédit",
    content: `
      <p>
      METBrandVoice est la première compétition artistique dédiée à la voix-off, mettant la publicité au cœur du spectacle. Chaque prestation est jugée en direct par le public. Ici, la publicité devient émotion, performance et engagement !
      </p>
    `
  }));

  // Valeur ajoutée - sous forme de cards dans une grille
  const valeurs: CardOptions[] = [
    {
      title: "Pour les talents",
      content: "Exposez votre voix, gagnez en visibilité et signez avec des marques."
    },
    {
      title: "Pour les marques",
      content: "Testez l'impact réel de votre message grâce à la voix, avec feedback instantané."
    },
    {
      title: "Pour le public",
      content: "Votez, pariez, gagnez des lots et devenez acteur du show."
    }
  ];
  const cards = valeurs.map(val => createCard(val));
  root.appendChild(createSection({
    id: "valeurs",
    title: "Nos valeurs et bénéfices",
    content: createGrid(cards)
  }));

  // Pour qui ?
  root.appendChild(createSection({
    id: "pourqui",
    title: "À qui s'adresse METBrandVoice ?",
    content: `
      <ul>
        <li><b>Talents voix-off :</b> révélez votre don et rencontrez des marques prêtes à vous confier leur identité sonore.</li>
        <li><b>Marques & annonceurs :</b> mesurez l’impact de votre identité par la voix, dans un format participatif et immersif.</li>
        <li><b>Public :</b> devenez jury, votez en direct, pariez, gagnez et vivez la pub autrement.</li>
      </ul>
    `
  }));

  // Contact
  const contactSection = createSection({
    id: "contact",
    title: "Contact",
    content: createContactForm()
  });
  root.appendChild(contactSection);

  // Footer
  root.appendChild(createFooter());
}