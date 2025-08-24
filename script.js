const canvas = document.querySelector("#container");
const gridSlid = document.querySelector("#gridSizeSlider");
const gridSliderLabel = document.querySelector("#gridSliderLabel");
let gridSize = +gridSlid.value;
const colorPicker = document.querySelector("#pencilColor");
let isDrawing = false;
let borderOn = false;

//botões de ferramenta:
const borracha = document.querySelector("#erase");
const rainbow = document.querySelector("#rainbow");
const escurecer = document.querySelector("#darken");
const clarear = document.querySelector("#lighten");
const clear = document.querySelector("#clear");
const bordas = document.querySelector("#border");
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

bordas.addEventListener("click", () => {
  borderOn = !borderOn;
  bordas.classList.toggle("activeButton");
  togglePixelBorder(borderOn);
});

let currentTool = "lapis";

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function setActiveButton(button) {
  if (activeToolButton) {
    activeToolButton.classList.remove("activeButton");
  }
  activeToolButton = button;
  if (activeToolButton) {
    activeToolButton.classList.add("activeButton");
  }
}

function togglePixelBorder(turnOn) {
  pixelList = document.querySelectorAll(".pixel");
  pixelList.forEach((element) => {
    if (turnOn) {
      element.style.outline = "1px solid #ccc";
      element.style.outlineOffset = "-1px";
    } else element.style.outline = "none";
  });
}

function brightLevelController(pixelElement, step) {
  let currentLevel = parseFloat(pixelElement.dataset.brightLevel);
  const newLevel = Math.min(1.0, Math.max(0.0, currentLevel + step));

  if (newLevel === currentLevel && (newLevel === 0.0 || newLevel === 1.0))
    return;

  pixelElement.dataset.brightLevel = newLevel.toFixed(2);
  let overlayColor;

  if (newLevel === 0.5) {
    pixelElement.style.backgroundImage = "none";
    return;
  } else if (newLevel < 0.5) {
    const alpha = (0.5 - newLevel) / 0.5;
    overlayColor = `rgba(0, 0, 0, ${alpha.toFixed(2)})`;
  } else {
    const alpha = (newLevel - 0.5) / 0.5;
    overlayColor = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
  }

  pixelElement.style.backgroundImage = `linear-gradient(${overlayColor}, ${overlayColor})`;
}

function tools(pixelElement) {
  switch (currentTool) {
    case "borracha":
      pixelElement.style.backgroundColor = "white";
      pixelElement.style.backgroundImage = "none";
      break;
    case "rainbow":
      pixelElement.style.backgroundColor = getRandomColor();
      pixelElement.style.backgroundImage = "none";
      pixelElement.dataset.brightLevel = 0.5;
      break;
    case "escurecer":
      brightLevelController(pixelElement, -0.1);
      break;
    case "clarear":
      brightLevelController(pixelElement, 0.1);
      break;
    default:
      pixelElement.style.backgroundColor = colorPicker.value;
      pixelElement.style.backgroundImage = "none";
      pixelElement.dataset.brightLevel = 0.5;
  }
}

function createPixel(grid) {
  canvas.innerHTML = "";
  canvas.style.display = 'grid';
  canvas.style.gridTemplateColumns = `repeat(${grid}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${grid}, 1fr)`;

  for (let i = 0; i < grid * grid; i++) {
    const pixel = document.createElement("div");
    pixel.dataset.brightLevel = "0.5";
    pixel.classList.add("pixel");

    if (borderOn) {
      pixel.style.outline = "1px solid #ccc";
      pixel.style.outlineOffset = "-1px";
    } else {
      pixel.style.outline = "none";
    }

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

//Previne bug no mouse ao 'carregar'
document.body.addEventListener("dragstart", (e) => {
  e.preventDefault();
  return false;
});

let resizeTimeout;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    createPixel(gridSize); 
  }, 150); 
});