// Wait for the page to fully load
window.addEventListener('load', function() {

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

document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.querySelector(".loading-screen");

  // Function to trigger the loading animation
  function showLoadingScreen() {
    loadingScreen.style.display = "flex";
    loadingScreen.style.transform = "translateY(-100%)"; // Start hidden
    loadingScreen.style.transition = "transform 0.5s ease-in-out"; // Faster animation
    document.querySelector(".loading-content").style.display = "none";
    setTimeout(() => {
      loadingScreen.style.transform = "translateY(0)"; // Slide down effect
    }, 10);
  }

  // Attach click event to all internal links
  document.querySelectorAll("a[href]").forEach((link) => {
    const url = link.getAttribute("href");

    // Check if the link is internal (not external like GitHub)
    if (url && !url.startsWith("http") && !url.startsWith("#") && !url.includes("mailto:")) {
      link.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default navigation
        showLoadingScreen();

        // Navigate after animation
        setTimeout(() => {
          window.location.href = url;
        }, 800);
      });
    }
  });
});
