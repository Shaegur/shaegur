// Function to add fade-in animation when a section is in view
const addFadeInEffect = (sectionId, threshold) => {
  const section = document.querySelector(sectionId);
  if (!section) return;

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              section.classList.add('fade-in')
              observer.unobserve(entry.target); // Stop observing after fade-in
          }
      });
  }, { threshold });

  observer.observe(section);
};

// Set fade-in thresholds dynamically based on screen size
const isTablet = window.innerWidth <= 910;
const isMobile = window.innerWidth <= 360;
addFadeInEffect('.aboutPageParagraph1', isTablet ? 0.5 : 1);
addFadeInEffect('.aboutPageParagraph2',  isTablet ? 0.5 : 1);
addFadeInEffect('.aboutPageParagraph3',  isTablet ? 0.8 : 1);
addFadeInEffect('.skills-container',  isTablet ? 0.5 : 1);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#about"], a[href^="#contact"], a[href^="#projects"], a[href^="#home"]')
  .forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default anchor behavior
          const targetElement = document.querySelector(this.getAttribute('href'));
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - (this.getAttribute('href') === '#home' ? 0 : 160),
                  behavior: 'smooth'
              });
          }
      });
  });