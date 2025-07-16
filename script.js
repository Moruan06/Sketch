const canvas = document.querySelector("#container");
let size = prompt("Insira o tamanho da tela: ");

function createPixel(grid){
    for(let i = 0; i < grid * grid; i++){
        const colorDiv = document.createElement("div");
        colorDiv.style.cssText = `flex-basis: ${100 / grid}%;
        height: ${100 / grid}%;`
        colorDiv.classList.add("pixel")
        canvas.appendChild(colorDiv)
    }
}

createPixel(+size)