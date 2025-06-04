const canvasContainer = document.querySelector(".canvas-container");
const canvasWidth = canvasContainer.offsetWidth;
const canvasHeight = canvasContainer.offsetHeight;
let pixels = [];
let pixelColor = '#FFE9CE';
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
      pixel.style.width = canvasWidth / pixelSize + "px";
      pixel.style.height = canvasHeight / pixelSize + "px";
      pixel.style.backgroundColor = "white";
      pixels.push(pixel);
      canvasContainer.appendChild(pixel);
    }
  };
  callDrawListeners();
}

function resetCanvas() {
  for (pixel of pixels) {
    pixel.style.backgroundColor = "white";
  }
};

function callDrawListeners() {
  pixels.forEach(pixel => {
  // keeps track if user wants to colour multiple pixels
  pixel.addEventListener('mousedown', () => {
    clicked = true;
  })
  pixel.addEventListener('mouseup', () => {
    clicked = false;
  })

  pixel.addEventListener('mouseenter', () => {
    document.body.style.cursor = "url('img/brush.png') 4 28, pointer";
  })

  pixel.addEventListener('mouseleave', () => {
    document.body.style.cursor = "auto";
  })

  // lets user color one pixel
  pixel.addEventListener('click', () => {
    drawPixelMode(pixel);
  });

  // if user is pressing down and dragging (via clicked = true), colours divs
  pixel.addEventListener('mousemove', () => {
    if (clicked) {
      drawPixelMode(pixel);
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
      changeMessage.innerText = "Size must be a number!";
    } else if (newSize < 0 || newSize > 100) {
      changeMessage.innerText = "Size must be between 0-100 pixels."
    } else {
      changeMessage.innerText = "";
      setCanvasSize(newSize);
    }
  });

  const natureButton = document.querySelector(".nature-button");
  natureButton.addEventListener('click', () => {
    pixelMode = 'nature';
  })

  const randomButton = document.querySelector(".random-button");
  randomButton.addEventListener('click', () => {
    let number = Math.round(Math.random() * (3 - 1) + 1);
    switch (number) {
      case 1:
        pixelMode = "gold";
        break;
      case 2:
        pixelMode = "rainbow";
        break;
      case 3:
        pixelMode = "monotone";
        break;
    }
  })
  
  const colorPicker = document.querySelector(".color-picker");
  colorPicker.addEventListener('click', () => {
    pixelMode = 'color';
  })
  colorPicker.addEventListener('mouseout', () => {
    pixelColor = colorPicker.value;
    callDrawListeners();
  })

  music = document.querySelector(".speaker-icon")
  music.addEventListener("click", playAudio);
}

function setPixelColor(pixel) {
  pixel.style.backgroundColor = pixelColor;
}

function setPixelNature(pixel) {
  let number = Math.round(Math.random() * (4 - 1) + 1);

  switch (number) {
    case 1:
      pixel.style.backgroundColor = "#E7EFC7";
      break;
    case 2:
      pixel.style.backgroundColor = "#AEC8A4";
      break;
    case 3:
      pixel.style.backgroundColor = "#537D5D";
      break;
    case 4:
      pixel.style.backgroundColor = "#B2CD9C";
      break;
  }
}

function setPixelRainbow(pixel) {
  let number = Math.round(Math.random() * (7 - 1) + 1); // To get number between 1-7

  switch (number) {
    case 1:
      pixel.style.backgroundColor = "#ffadad";
      break;
    case 2:
      pixel.style.backgroundColor = "#ffd6a5";
      break;
    case 3:
      pixel.style.backgroundColor = "#fdffb6";
      break;
    case 4:
      pixel.style.backgroundColor = "#caffbf";
      break;
    case 5:
      pixel.style.backgroundColor = "#9bf6ff";
      break;
    case 6:
      pixel.style.backgroundColor = "#bdb2ff";
      break;
  }
}

function setPixelMonotone(pixel) {
  let number = Math.round(Math.random() * (3 - 1) + 1);

  switch (number) {
    case 1:
      pixel.style.backgroundColor = "black";
      break;
    case 2:
      pixel.style.backgroundColor = "lightgray";
      break;
    case 3:
      pixel.style.backgroundColor = "gray";
      break;
  }
}

function setPixelGolden(pixel) {
  let number = Math.round(Math.random() * (4 - 1) + 1);

  switch (number) {
    case 1:
      pixel.style.backgroundColor = "#A86523";
      break;
    case 2:
      pixel.style.backgroundColor = "#E9A319";
      break;
    case 3:
      pixel.style.backgroundColor = "#FAD59A";
      break;
    case 4:
      pixel.style.backgroundColor = "#FCEFCB";
      break;
  }
}

function drawPixelMode(pixel) {
  if (pixelMode == 'color') {
    setPixelColor(pixel);
  } else if (pixelMode == 'nature') {
    setPixelNature(pixel);
  } else if (pixelMode == 'gold'){
    setPixelGolden(pixel);
  } else if (pixelMode == 'rainbow') {
    setPixelRainbow(pixel);
  } else {
    setPixelMonotone(pixel);
  }
}

function playAudio() {
  audio = document.querySelector('.jazz-audio');
  speakerIcon = document.querySelector('.speaker-icon')

  audio.classList.toggle("music-on");

  if (audio.classList.contains("music-on")) {
    audio.play();
    speakerIcon.setAttribute('src', "img/speaker-icon.png");
    localStorage.setItem("music", "music-on");
  } else {
    audio.pause();
    speakerIcon.setAttribute('src', "img/mute-icon.png");
    localStorage.setItem("music", "");
  }
}