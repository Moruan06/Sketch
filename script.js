const canvas = document.querySelector("#container");
const gridSlid = document.querySelector("#gridSizeSlider");
const gridSliderLabel = document.querySelector("#gridSliderLabel");
let gridSize = +gridSlid.value;
const colorPicker = document.querySelector("#pencilColor");
let isDrawing = false;

function createPixel(grid) {
  canvas.innerHTML = "";
  for (let i = 0; i < grid * grid; i++) {
    const pixel = document.createElement("div");
    pixel.style.cssText = `flex-basis: ${100 / grid}%;
        height: ${100 / grid}%;`;
    pixel.classList.add("pixel");

    pixel.addEventListener("mousedown", (e) => {
      isDrawing = true;
      pixel.style.backgroundColor = `${colorPicker.value}`;
    });
    pixel.addEventListener("mouseover", (e) => {
      if (isDrawing) pixel.style.backgroundColor = `${colorPicker.value}`;
    });
    document.body.addEventListener("mouseup", (e) => (isDrawing = false));
    canvas.appendChild(pixel);
  }
}

createPixel(gridSize);
gridSliderLabel.textContent = `${gridSize}x${gridSize}`;

gridSlid.addEventListener("input", (e) => {
  gridSize = +e.target.value;
  createPixel(gridSize);
  gridSliderLabel.textContent = `${gridSize}x${gridSize}`;
});
