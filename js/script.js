const container = document.querySelector(".container");
const input = document.querySelector("input");
const controls = document.querySelector(".controls");
const resize = document.querySelector(".resize button");
let rgb = "0,0,0";
let color;

function populateContainer(n) {
  container.innerHTML = "";
  container.style.gridTemplateColumns = `${"auto ".repeat(n)}`;
  let width = `${container.clientWidth / n}px`;
  let height = `${container.clientHeight / n}px`;
  for (let i = 0; i < Math.pow(n, 2); i++) {
    container.append(createCell(width, height));
  }
}

function createCell(width, height) {
  const cell = document.createElement("div");
  cell.style.width = width;
  cell.style.height = height;
  cell.style.border = "1px solid #ADADAD";
  cell.setAttribute("mod", 0.1);
  cell.addEventListener("mouseover", (event) => draw(event.target));
  return cell;
}

function draw(element) {
  let alpha = Number(element.getAttribute("mod"));
  let mod = alpha * 10;
  if (color === "random") {
    rgb = `${randColor()},${randColor()},${randColor()}`;
  } else if (color === "white") {
    alpha = "1";
    mod = 0;
  }
  element.style.backgroundColor = `rgba(${rgb},${alpha})`;
  if (mod < 10) {
    mod = ++mod / 10;
    element.setAttribute("mod", mod);
  }
}

function randColor() {
  return Math.floor(Math.random() * 255) + 1;
}

function reset() {
  for (let element of container.children) {
    element.style.backgroundColor = "white";
    element.setAttribute("mod", 0.1);
  }
}

controls.addEventListener("click", (event) => {
  const element = event.target;
  switch (element.textContent) {
    case "Black":
      color = "black";
      rgb = "0,0,0";
      break;
    case "Grey":
      color = "grey";
      rgb = "128,128,128";
      break;
    case "Random":
      color = "random";
      break;
    case "Eraser":
      color = "white";
      rgb = "255,255,255";
      break;
    case "Reset":
      reset();
      break;
  }
});

resize.addEventListener("click", () => {
  let val = Number(input.value);
  if (val > 1 && val < 101) {
    populateContainer(val);
  }
  input.value = "";
});

populateContainer(16);
