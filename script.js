// Wait for the page to fully load
window.addEventListener('load', function() {
  // Add active class to the "Home" link while loading
  const homeNavItem = document.querySelector('.left-nav a[href="#home"]');
  homeNavItem.classList.add('active'); // Make "Home" active initially

  const loadingScreen = document.querySelector('.loading-screen');
  const mainContent = document.querySelector('.main-content');

  // Slide up the loading screen after 500ms
  setTimeout(() => {
      loadingScreen.style.transform = 'translateY(-100%)'; // Slide it up
      mainContent.style.display = 'block'; // Reveal the website content
      setTimeout(() => (loadingScreen.style.display = 'none'), 1000); // Hide loading screen
  }, 1000);
});

// Toggle navigation menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active'); // Toggle navigation visibility
  hamburger.classList.toggle('active'); // Toggle hamburger transformation
});

// Scrollbar update based on scroll progress
const scrollbar = document.querySelector('.scrollbar');
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollbar.style.width = `${(scrollTop / docHeight) * 100}%`; // Set scrollbar width
});

// Dark mode functionality
const darkmodeToggle = document.getElementById('darkmode-toggle');
if (localStorage.getItem('darkmode') === "active") {
  document.body.classList.add('darkmode');
  darkmodeToggle.checked = true; // Reflect dark mode state
}

darkmodeToggle.addEventListener('change', function() {
  document.body.classList.toggle('darkmode', this.checked);
  localStorage.setItem('darkmode', this.checked ? 'active' : null);
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
const isMobile = window.innerWidth <= 910;
addFadeInEffect('.about', '.about-title, .about-box', isMobile ? 0.8 : 1);
addFadeInEffect('.contact', '.contact-title, .contact-box', isMobile ? 0.95 : 1);
addFadeInEffect('#projects', '.projects-title, .projects-container', isMobile ? 0.25 : 0.6);

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
