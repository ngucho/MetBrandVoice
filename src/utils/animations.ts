export function setupSectionObserver() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.section'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(sec => {
    observer.observe(sec);
  });
}
