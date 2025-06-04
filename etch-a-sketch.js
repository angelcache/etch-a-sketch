// Generates the square
const divContainer = document.querySelector(".grid-container");
const containerSize = divContainer.offsetWidth;
divs = [];

let squareSize = 16;
let clicked = false;

for (i = 1; i <= squareSize; i++) {
  for (j = 1; j <= squareSize; j++) {
    const div = document.createElement("div");
    div.style.width = containerSize / squareSize + "px";
    div.style.height = containerSize / squareSize + "px";
    div.style.backgroundColor = "brown";
    divs.push(div);
    divContainer.appendChild(div);
  }
};


divs.forEach(div => {

  // keeps track if user wants to colour multiple divs
  div.addEventListener('mousedown', () => {
    clicked = true;
  })
  div.addEventListener('mouseup', () => {
    clicked = false;
  })

  // lets user color one div
  div.addEventListener('click', () => {
    changeDivColor(div); 
  });

  // if user is pressing down and dragging (via clicked = true), colours divs
  div.addEventListener('mousemove', () => {
    if (clicked) {
      changeDivColor(div);
    }
  });
});

function changeDivColor(div) {
  /**
   * Changes the Color of the Div
   */
  div.style.backgroundColor = "blue";
}