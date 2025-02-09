// Wait for the page to fully load
window.addEventListener('load', function() {
    // Slide up the loading screen after 500ms
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.transform = 'translateY(-100%)'; // Slide it up
        const mainContent = document.querySelector('.main-content');
        mainContent.style.display = 'block'; // Reveal the website content
        setTimeout(function() {
            loadingScreen.style.display = 'none'; // Hide the loading screen
        }, 1000); // Delay before hiding loading screen
    }, 1000); // Delay before starting the slide up
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggle navigation visibility (slide in/out)
    hamburger.classList.toggle('active'); // Toggle hamburger transformation (X shape)
});

// Get the scrollbar and container elements
const scrollbar = document.querySelector('.scrollbar');
const scrollbarContainer = document.querySelector('.scrollbar-container');

// Update the width of the scrollbar based on the scroll progress
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / docHeight) * 100;
    scrollbar.style.width = scrollPercentage + '%'; // Set the width to reflect scroll progress
});

let darkmode = localStorage.getItem('darkmode')
const darkmodeToggle = document.getElementById('darkmode-toggle');

// Set the checkbox state based on localStorage when the page loads
if(darkmode === "active") {
    document.body.classList.add('darkmode');
    darkmodeToggle.checked = true; // Ensure the checkbox reflects dark mode state
}

darkmodeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('darkmode');
        localStorage.setItem('darkmode', 'active');
    } else {
        document.body.classList.remove('darkmode');
        localStorage.setItem('darkmode', null);
    }
});

// Function to add fade-in animation when a section is in view
const addFadeInEffect = (sectionId, targetSelector, threshold) => {
  const section = document.querySelector(sectionId);

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add fade-in classes to target elements within the section
        entry.target.querySelectorAll(targetSelector).forEach(target => {
          target.classList.add('fade-in');
        });
        observer.unobserve(entry.target); // Stop observing once the animation is triggered
      }
    });
  }, { threshold: threshold }); // Use the dynamic threshold value

  observer.observe(section);
};

// Set the threshold based on device type
const isMobile = window.innerWidth <= 910; // Assuming 910px as the breakpoint for mobile

// Apply the fade-in effect for the About Me section (using 50% threshold for both)
addFadeInEffect('.about', '.about-title, .about-box', isMobile ? 0.8 : 1);

// Apply the fade-in effect for the Projects section with dynamic threshold
addFadeInEffect('#projects', '.projects-title, .projects-container', isMobile ? 0.25 : 0.6);

// Smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#about"], a[href^="#projects"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();  // Prevent default anchor behavior

    // Get the target element
    const targetElement = document.querySelector(this.getAttribute('href'));

    // Calculate the offset (change the value here to adjust scroll position)
    const offset = 160;  // Example: scroll 160px down

    // Scroll smoothly to the target element with the offset
    window.scrollTo({
      top: targetElement.offsetTop - offset,
      behavior: 'smooth'
    });
  });
});

document.querySelectorAll('a[href^="#home"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();  // Prevent default anchor behavior

    // Get the target element
    const targetElement = document.querySelector(this.getAttribute('href'));

    // Scroll smoothly to the target element with the offset
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  });
});
