// Wait for the page to fully load
window.addEventListener('load', function() {
  // Add active class to the "Home" link while loading
  const homeNavItem = document.querySelector('.left-nav a[href="#home"]');
  homeNavItem.classList.add('active'); // Make "Home" active initially

});

// Function to add fade-in animation when a section is in view
const addFadeInEffect = (sectionId, targetSelector, threshold) => {
  const section = document.querySelector(sectionId);
  if (!section) return;

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              section.querySelectorAll(targetSelector).forEach(target => 
                  target.classList.add('fade-in')
              );
              observer.unobserve(entry.target); // Stop observing after fade-in
          }
      });
  }, { threshold });

  observer.observe(section);
};

// Set fade-in thresholds dynamically based on screen size
const isTablet = window.innerWidth <= 910;
const isMobile = window.innerWidth <= 360;
addFadeInEffect('.about', '.about-title, .about-box', isTablet ? (isMobile ? 0.48 : 0.8 ): 1);
addFadeInEffect('.contact', '.contact-title, .contact-box', isTablet ? 0.95 : 1);
addFadeInEffect('#projects', '.projects-title, .projects-container', isTablet ? (isMobile ? 0.15 : 0.25 ) : 0.6);

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

// Update active nav item on scroll and click
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.left-nav .nav-item');

  const updateActiveNav = () => {
      navItems.forEach(item => {
          const target = document.querySelector(item.getAttribute('href'));
          if (!target) return;
          const rect = target.getBoundingClientRect();
          item.classList.toggle('active', rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5);
      });
  };

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  navItems.forEach(item => {
      item.addEventListener('click', function() {
          navItems.forEach(nav => nav.classList.remove('active'));
          this.classList.add('active');
      });
  });
});
