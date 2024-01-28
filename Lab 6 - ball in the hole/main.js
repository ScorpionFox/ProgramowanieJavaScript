let gameCanvas, ctx, gameBall, gameHole, isGameOver = false;
let tiltX = 0, tiltY = 0, playerName, playerTime, userInputBox, gameRecords;
let top1Element, top2Element, top3Element, top4Element, top5Element, isGameLoopActive = false;
let currentGameTime = 0;

const GAME_WIDTH = 600;  
const GAME_HEIGHT = 600;  

document.getElementById('StartButton').addEventListener('click', startGame);

function initializeGame() {
  gameCanvas = document.getElementById('gameCanvas');
  ctx = gameCanvas.getContext('2d');
  gameCanvas.width = GAME_WIDTH;
  gameCanvas.height = GAME_HEIGHT;
  gameBall = { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2, radius: 15, color: '#21d3eb', speed: 2 };
  gameHole = { x: Math.random() * GAME_WIDTH, y: Math.random() * GAME_HEIGHT, radius: 20, color: '#FF0000' };
  window.addEventListener('deviceorientation', handleOrientation);

  if (!isGameLoopActive) {
    isGameLoopActive = true;
    gameLoop();
  }
}

function startGame() {
    playerName = document.getElementById('Username').value;
    
    if (playerName.trim() === "") {
      alert("Please enter a nickname before starting the game.");
      return;
    }
  
    userInputBox.style.display = "none";
    isGameOver = false;
    currentGameTime = 0;
    initializeGame();
  }

function addNewRecord() {
  playerTime = currentGameTime;
  let record = { username: playerName, time: playerTime };
  gameRecords = JSON.parse(localStorage.getItem('records')) || [];
  gameRecords.push(record);
  localStorage.setItem('records', JSON.stringify(gameRecords));
  updateLeaderboard();
}

function updateLeaderboard() {
  gameRecords = JSON.parse(localStorage.getItem('records')) || [];
  gameRecords.sort((a, b) => b.time - a.time);
  [top1Element, top2Element, top3Element, top4Element, top5Element].forEach((el, i) => {
    let tmpRecord = gameRecords[i] || {};
    el.innerText = `${i + 1}. ${tmpRecord.username || ''}      : ${formatTime(tmpRecord.time || 0)}`;
  });
}

function handleOrientation(event) {
  const tiltFactor = 0.02;
  tiltX = event.gamma * tiltFactor;
  tiltY = event.beta * tiltFactor;

  tiltX = Math.max(-1, Math.min(1, tiltX));
  tiltY = Math.max(-1, Math.min(1, tiltY));
}

function updateGame() {
  if (!isGameOver) {
    gameBall.x += tiltX * gameBall.speed;
    gameBall.y += tiltY * gameBall.speed;

    ['x', 'y'].forEach(axis => {
      gameBall[axis] = Math.max(gameBall.radius, Math.min(gameBall[axis], GAME_WIDTH - gameBall.radius));
      gameBall[axis] = Math.max(gameBall.radius, Math.min(gameBall[axis], GAME_HEIGHT - gameBall.radius));
    });

    if (isBallInHole()) {
      isGameOver = true;
      addNewRecord(playerName, playerTime);
      userInputBox.style.display = "block";
      alert('You won!');
    }
  }
}

function drawGame() {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  [gameHole, gameBall].forEach(obj => {
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
    ctx.fillStyle = obj.color;
    ctx.fill();
    ctx.closePath();
  });
}

function gameLoop() {
  updateGame();
  drawGame();
  requestAnimationFrame(gameLoop);
}

function isBallInHole() {
  const distance = Math.sqrt((gameBall.x - gameHole.x) ** 2 + (gameBall.y - gameHole.y) ** 2);
  return distance < gameBall.radius + gameHole.radius;
}

function updateGameTimer() {
  currentGameTime++;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

setInterval(updateGameTimer, 100);

window.addEventListener('load', () => {
  userInputBox = document.getElementById('UsernameBox');
  [top1Element, top2Element, top3Element, top4Element, top5Element] = Array.from({ length: 5 }, (_, i) => document.getElementById(`Top${i + 1}`));
  timerElement = document.getElementById('Timer');
  updateLeaderboard();
});
