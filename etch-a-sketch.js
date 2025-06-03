divContainer = document.querySelector(".grid-container");

divs = [];

for (i = 1; i <= 16; i++) {
  for (j = 1; j <= 16; j++) {
    console.log("hey");
    const div = document.createElement("div");
    div.classList.add(`div${i}`);
    div.style.width = "20px";
    div.style.height = "20px";
    div.style.backgroundColor = "brown";
    divContainer.appendChild(div);
  }
};