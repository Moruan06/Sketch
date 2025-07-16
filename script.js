const canvas = document.querySelector("#container");
function createPixel(grid){
    canvas.innerHTML = '';
    for(let i = 0; i < grid * grid; i++){
        const colorDiv = document.createElement("div");
        colorDiv.style.cssText = `flex-basis: ${100 / grid}%;
        height: ${100 / grid}%;`;
        colorDiv.classList.add("pixel");
        canvas.appendChild(colorDiv);
    };
};

const gridSlid = document.querySelector("#gridSizeSlider");

gridSlid.addEventListener('change', (e) => createPixel(+e.target.value));
