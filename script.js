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
    }, 500); // Delay before starting the slide up
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

// Create an intersection observer to trigger fade-in effect when About Me is in view
const aboutSection = document.querySelector('.about');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add animation classes when About Me section is in view
      entry.target.querySelector('.about-title').classList.add('fade-in');
      entry.target.querySelector('.about-box').classList.add('fade-in');
      observer.unobserve(entry.target); // Stop observing once the animation is triggered
    }
  });
}, { threshold: 0.5 }); // Trigger when 50% of the section is visible

observer.observe(aboutSection);

document.querySelectorAll('a[href^="#about"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();  // Prevent default anchor behavior

      // Get the target element
      const targetElement = document.querySelector(this.getAttribute('href'));

      // Calculate the offset (change the value here to adjust scroll position)
      const offset = 120;  // Example: scroll 100px down

      // Scroll smoothly to the target element with the offset
      window.scrollTo({
        top: targetElement.offsetTop - offset,
        behavior: 'smooth'
      });
    });
  });