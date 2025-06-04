const canvasContainer = document.querySelector(".canvas-container");
const canvasSize = canvasContainer.offsetWidth;
let pixels = [];
let clicked = false;

setCanvasSize(16);
callDrawListeners();
callButtonListeners();

function setCanvasSize(pixelSize) {
  canvasContainer.innerHTML = "";
  pixels = []

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
  callDrawListeners();
}

function callDrawListeners() {
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
}

function callButtonListeners() {
  const resetButton = document.querySelector(".reset-button");
  resetButton.addEventListener('click', resetCanvas);
  const changeSizeButton = document.querySelector(".change-button")
  const inputSize = document.querySelector(".change-input");
  const changeMessage = document.querySelector(".change-message");
  changeSizeButton.addEventListener('click', () => {
    let newSize = parseInt(inputSize.value);
    if (!newSize) {
      changeMessage.innerText = "Size be a number";
    } else if (newSize < 0 || newSize > 100) {
      changeMessage.innerText = "Size must be between 0-100 pixels"
    } else {
      changeMessage.innerText = "";
      setCanvasSize(newSize);
    }
  });
}

function changePixelColor(pixel) {
  pixel.style.backgroundColor = "blue";
};

function resetCanvas() {
  for (pixel of pixels) {
    pixel.style.backgroundColor = "brown";
  }
};