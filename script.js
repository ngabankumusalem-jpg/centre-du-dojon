const gridSize = 10; // taille du damier
let position = { row: 0, col: 0 }; // position initiale

const positionDisplay = document.createElement("div");
positionDisplay.id = "position";
document.getElementById("status").appendChild(positionDisplay);

function updatePositionDisplay() {
  positionDisplay.textContent = `Position : (${position.row}, ${position.col})`;
}
updatePositionDisplay();

let food = 10;
const foodDisplay = document.getElementById("food");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");

function updateFood() {
  foodDisplay.textContent = food;
  if (food <= 0) {
    alert("Tu n'as plus de nourriture. Tu vas être réapparu.");
    food = 10; // recharge
    // ici tu peux ajouter une logique de réapparition aléatoire
    updateFood();
  }
}

function move(direction) {
  const oldRow = position.row;
  const oldCol = position.col;

  switch (direction) {
    case "le Nord":
      if (position.row > 0) position.row--;
      break;
    case "le Sud":
      if (position.row < gridSize - 1) position.row++;
      break;
    case "l'Ouest":
      if (position.col > 0) position.col--;
      break;
    case "l'Est":
      if (position.col < gridSize - 1) position.col++;
      break;
  }

  // Vérifie si la position a changé
  if (position.row !== oldRow || position.col !== oldCol) {
    food--;
    updateFood();
    updatePositionDisplay();
    addMessage(`Tu es allé vers ${direction}`);
  } else {
    addMessage(`Impossible d'aller vers ${direction} — bord du damier`);
  }
}
function addMessage(text) {
  const msg = document.createElement("div");
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

document.getElementById("up").onclick = () => move("le Nord");
document.getElementById("down").onclick = () => move("le Sud");
document.getElementById("left").onclick = () => move("l'Ouest");
document.getElementById("right").onclick = () => move("l'Est");

document.getElementById("send-chat").onclick = () => {
  const text = chatInput.value.trim();
  if (text) {
    addMessage(`Un joueur dit : ${text}`);
    chatInput.value = "";
  }
};