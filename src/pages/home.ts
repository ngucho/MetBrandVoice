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
      <div class="img-placeholder"></div>
      <p>
        METBrandVoice est la première compétition artistique dédiée à la voix-off, mettant la publicité au cœur du spectacle. Chaque prestation est jugée en direct par le public.
        Ici, la publicité devient émotion, performance et engagement ! Les candidats s'affrontent sur scène, interprétant des textes publicitaires devant un public en immersion totale.
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
  const valeursContent = [] as HTMLElement[];
  const imgVal = document.createElement('div');
  imgVal.className = 'img-placeholder';
  valeursContent.push(imgVal, createGrid(cards));
  root.appendChild(createSection({
    id: "valeurs",
    title: "Nos valeurs et bénéfices",
    content: valeursContent
  }));

  // Pour qui ?
  const cibleList = document.createElement('div');
  cibleList.innerHTML = `
    <ul>
      <li><b>Talents voix-off :</b> révélez votre don et rencontrez des marques prêtes à vous confier leur identité sonore.</li>
      <li><b>Marques & annonceurs :</b> mesurez l’impact de votre identité par la voix, dans un format participatif et immersif.</li>
      <li><b>Public :</b> devenez jury, votez en direct, pariez, gagnez et vivez la pub autrement.</li>
    </ul>
  `;
  const cibleImg = document.createElement('div');
  cibleImg.className = 'img-placeholder';
  root.appendChild(createSection({
    id: "pourqui",
    title: "À qui s'adresse METBrandVoice ?",
    content: [cibleImg, cibleList]
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