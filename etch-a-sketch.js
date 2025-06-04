// Generates the square
const canvasContainer = document.querySelector(".canvas-container");
const canvasSize = canvasContainer.offsetWidth;
pixels = [];

let pixelSize = 16;
let clicked = false;

for (i = 1; i <= pixelSize; i++) {
  for (j = 1; j <= pixelSize; j++) {
    const pixel = document.createElement("div");
    pixel.style.width = canvasSize / pixelSize + "px";
    pixel.style.height = canvasSize / pixelSize + "px";
    pixel.style.backgroundColor = "brown";
    pixels.push(pixel);
    canvasContainer.appendChild(pixel);
  }
};

pixels.forEach(pixel => {
  // keeps track if user wants to colour multiple pixels
  pixel.addEventListener('mousedown', () => {
    clicked = true;
  })
  pixel.addEventListener('mouseup', () => {
    clicked = false;
  })

  // lets user color one pixel
  pixel.addEventListener('click', () => {
    changePixelColor(pixel); 
  });

  // if user is pressing down and dragging (via clicked = true), colours divs
  pixel.addEventListener('mousemove', () => {
    if (clicked) {
      changePixelColor(pixel);
    }
  });
});

function changePixelColor(pixel) {
  /**
   * Changes the Color of the Div
   */
  pixel.style.backgroundColor = "blue";
}

