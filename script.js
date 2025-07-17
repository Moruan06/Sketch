const canvas = document.querySelector("#container");
const gridSlid = document.querySelector("#gridSizeSlider");
const gridSliderLabel = document.querySelector("#gridSliderLabel");
let gridSize = +gridSlid.value;
const colorPicker = document.querySelector("#pencilColor");
let isDrawing = false;

//botões de ferramenta:
const borracha = document.querySelector("#erase");
const rainbow = document.querySelector("#rainbow");
const escurecer = document.querySelector("#darken");
const clarear = document.querySelector("#lighten");
const clear = document.querySelector("#clear");
let activeToolButton = null;

clear.addEventListener("click", () => createPixel(gridSize));
borracha.addEventListener("click", () => {
  if (currentTool === "borracha") {
    currentTool = "lapis";
    activeToolButton.classList.remove("activeButton");
  } else {
    currentTool = "borracha";
    setActiveButton(borracha);
  }
});
rainbow.addEventListener("click", () => {
  if (currentTool === "rainbow") {
    currentTool = "lapis";
    activeToolButton.classList.remove("activeButton");
  } else {
    currentTool = "rainbow";
    setActiveButton(rainbow);
  }
});
escurecer.addEventListener("click", () => {
  if (currentTool === "escurecer") {
    currentTool = "lapis";
    activeToolButton.classList.remove("activeButton");
  } else {
    currentTool = "escurecer";
    setActiveButton(escurecer);
  }
});
clarear.addEventListener("click", () => {
  if (currentTool === "clarear") {
    currentTool = "lapis";
    activeToolButton.classList.remove("activeButton");
  } else {
    currentTool = "clarear";
    setActiveButton(clarear);
  }
});
let currentTool = "lapis";

function setActiveButton(button) {
  if (activeToolButton) {
    activeToolButton.classList.remove("activeButton");
  }
  activeToolButton = button;
  if (activeToolButton) {
    activeToolButton.classList.add("activeButton");
  }
}

function tools(pixelElement) {
  switch (currentTool) {
    case "borracha":
      pixelElement.style.backgroundColor = "white";
      break;
    case "lapis":
      pixelElement.style.backgroundColor = `${colorPicker.value}`;
  }
}

function createPixel(grid) {
  canvas.innerHTML = "";
  for (let i = 0; i < grid * grid; i++) {
    const pixel = document.createElement("div");
    pixel.style.cssText = `flex-basis: ${100 / grid}%;
        height: ${100 / grid}%;`;
    pixel.classList.add("pixel");

    pixel.addEventListener("mousedown", (e) => {
      isDrawing = true;
      tools(pixel);
    });
    pixel.addEventListener("mouseover", (e) => {
      if (isDrawing) tools(pixel);
    });
    document.body.addEventListener("mouseup", (e) => (isDrawing = false));
    canvas.appendChild(pixel);
  }
}

createPixel(gridSize);
gridSliderLabel.textContent = `${gridSize}x${gridSize}`;

gridSlid.addEventListener("change", (e) => {
  gridSize = +e.target.value;
  createPixel(gridSize);
});
gridSlid.addEventListener("input", (e) => {
  gridSize = +e.target.value;
  gridSliderLabel.textContent = `${gridSize}x${gridSize}`;
});
