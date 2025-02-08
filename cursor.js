// Track mouse movement and visibility
let isMouseOut = true; // Start with the cursor "out" initially

const circleElement = document.querySelector('.cursor_circle');

// Create objects to track mouse position and custom cursor position
const mouse = { x: 0, y: 0 }; // Track current mouse position
const previousMouse = { x: 0, y: 0 }; // Store the previous mouse position
const circle = { x: 0, y: 0 }; // Track the circle position

// Initialize variables to track scaling and rotation
let currentScale = 0; // Track current scale value
let currentAngle = 0; // Track current angle value

// Initialize border size
let borderSize = 1;  // Default border size (normal)

// Update mouse position on the 'mousemove' event
window.addEventListener('mousemove', (e) => {
  // Show the cursor only when mouse is inside the window
  if (isMouseOut) {
    circleElement.classList.remove('hidden');
    isMouseOut = false;  // Mouse is no longer "out"
  }

  // Update mouse position
  mouse.x = e.x;
  mouse.y = e.y;
});

// Detect when the mouse goes out of the window and hide the cursor
window.addEventListener('mouseout', () => {
  // Only hide cursor if it's visible
  if (!circleElement.classList.contains('hidden')) {
    circleElement.classList.add('hidden');
    isMouseOut = true; // Mouse is now "out"
  }
});

// Detect when the mouse comes back into the window and show the cursor again
window.addEventListener('mouseover', () => {
  // Ensure the cursor is visible when the mouse re-enters the window
  if (isMouseOut) {
    circleElement.classList.remove('hidden');
    isMouseOut = false;
  }
});

// Handle mouse down (press)
window.addEventListener('mousedown', () => {
  borderSize = 3; // Increase border size when pressed down
  circleElement.style.borderWidth = `${borderSize}px`;
});

// Handle mouse up (release)
window.addEventListener('mouseup', () => {
  borderSize = 1; // Reset border size when released
  circleElement.style.borderWidth = `${borderSize}px`;
});

// Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
const speed = 0.17;

// Start animation
const tick = () => {
  // MOVE
  // Calculate circle movement based on mouse position and smoothing
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;
  // Create a transformation string for cursor translation
  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  // SQUEEZE
  // 1. Calculate the change in mouse position (deltaMouse)
  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;
  // Update previous mouse position for the next frame
  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;
  // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
  const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150); 
  // 3. Convert mouse velocity to a value in the range [0, 0.5]
  const scaleValue = (mouseVelocity / 150) * 0.5;
  // 4. Smoothly update the current scale
  currentScale += (scaleValue - currentScale) * speed;
  // 5. Create a transformation string for scaling
  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

  // ROTATE
  // 1. Calculate the angle using the atan2 function
  const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
  // 2. Check for a threshold to reduce shakiness at low mouse velocity
  if (mouseVelocity > 20) {
    currentAngle = angle;
  }
  // 3. Create a transformation string for rotation
  const rotateTransform = `rotate(${currentAngle}deg)`;

  // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
  circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

  // Request the next frame to continue the animation
  window.requestAnimationFrame(tick);
}

// Start the animation loop
tick();
