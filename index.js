const container = document.getElementById('container');

function createGrid(size) {
  container.innerHTML = '';
  container.style.setProperty('--grid-size', size);

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseover', changeColor);
    container.appendChild(square);
  }
}

function resetGrid() {
  let gridSize = parseInt(prompt('Enter the number of squares per side (maximum 100):'));
  if (gridSize < 1 || isNaN(gridSize)) gridSize = 16;
  if (gridSize > 100) gridSize = 100;
  createGrid(gridSize);
}

function changeColor(event) {
  const square = event.target;
  const currentColor = square.style.backgroundColor;

  if (!currentColor || currentColor === 'red') {
    square.style.backgroundColor = getRandomColor();
  } else {
    const darkenPercentage = getDarkenPercentage(currentColor);
    square.style.backgroundColor = darkenColor(currentColor, darkenPercentage);
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function getDarkenPercentage(color) {
  const matches = color.match(/\d+/g);
  const [r, g, b] = matches.map(Number);
  const maxColorValue = Math.max(r, g, b);
  return Math.round((maxColorValue / 255) * 10) * 10;
}

function darkenColor(color, percentage) {
  const matches = color.match(/\d+/g);
  const [r, g, b] = matches.map(Number);
  const darkenAmount = Math.round((percentage / 100) * 255);
  const newR = r - darkenAmount;
  const newG = g - darkenAmount;
  const newB = b - darkenAmount;
  return `rgb(${newR}, ${newG}, ${newB})`;
}


createGrid(16);
