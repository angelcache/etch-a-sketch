const canvasContainer = document.querySelector(".canvas-container");
const canvasSize = canvasContainer.offsetWidth;
let pixels = [];
let pixelMode = 'color';
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
    if (pixelMode == 'color') {
        setPixelColor(pixel);
      } else {
        setPixelRainbow(pixel);
      }
  });

  // if user is pressing down and dragging (via clicked = true), colours divs
  pixel.addEventListener('mousemove', () => {
    if (clicked) {
      if (pixelMode == 'color') {
        setPixelColor(pixel);
      } else {
        setPixelRainbow(pixel);
      }
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
  const rainbowButton = document.querySelector(".rainbow-button");
  rainbowButton.addEventListener('click', () => {
    pixelMode = 'rainbow';
  })
}

function setPixelColor(pixel) {
  pixel.style.backgroundColor = "blue";
}

function setPixelRainbow(pixel) {
  let rainbowNumber = Math.round(Math.random() * (7 - 1) + 1); // To get number between 1-7

  console.log(rainbowNumber);
  switch (rainbowNumber) {
    case 1:
      pixel.style.backgroundColor = "red";
      break;
    case 2:
      pixel.style.backgroundColor = "orange";
      break;
    case 3:
      pixel.style.backgroundColor = "yellow";
      break;
    case 4:
      pixel.style.backgroundColor = "green";
      break;
    case 5:
      pixel.style.backgroundColor = "blue";
      break;
    case 6:
      pixel.style.backgroundColor = "purple";
      break;
  }
}

function resetCanvas() {
  for (pixel of pixels) {
    pixel.style.backgroundColor = "brown";
  }
};