
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
addFadeInEffect('.contact-container', '.contactList, .login-box', isTablet ? (isMobile ? 0.5 : 0.7 ): 1);

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

const form = document.getElementById('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
        })
        .catch(error => {
            console.log(error);
        })
        .then(function() {
            form.reset();
        });
});