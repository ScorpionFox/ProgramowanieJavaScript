const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const balls = [];
const maxDistance = 100;
let animationPaused = false;

document.getElementById("stopBtn").addEventListener("click", stopAnimation);
document.getElementById("resetBtn").addEventListener("click", resetAnimation);

function Ball(x, y, radius, speedX, speedY, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.speedX = speedX;
  this.speedY = speedY;
  this.color = color;
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function drawLine(ball, otherBall) {
  ctx.beginPath();
  ctx.moveTo(ball.x, ball.y);
  ctx.lineTo(otherBall.x, otherBall.y);
  ctx.strokeStyle = ball.color;
  ctx.stroke();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];

    drawBall(ball);

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
      ball.speedX = -ball.speedX;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.speedY = -ball.speedY;
    }

    for (let j = i + 1; j < balls.length; j++) {
      const otherBall = balls[j];
      const distance = Math.sqrt(
        (ball.x - otherBall.x) ** 2 + (ball.y - otherBall.y) ** 2
      );

      if (distance < maxDistance) {
        drawLine(ball, otherBall);
      }
    }
  }

  if (!animationPaused) {
    requestAnimationFrame(draw);
  }
}

function stopAnimation() {
  animationPaused = !animationPaused;
  if (!animationPaused) {
    draw();
  }
}

function resetAnimation() {
  balls.length = 0;

  for (let i = 0; i < 10; i++) {
    const x = Math.random() * (canvas.width - 2 * maxDistance) + maxDistance;
    const y = Math.random() * (canvas.height - 2 * maxDistance) + maxDistance;
    const radius = 20;
    const speedX = (Math.random() - 0.5) * 4;
    const speedY = (Math.random() - 0.5) * 4;
    const color = getRandomColor();
    balls.push(new Ball(x, y, radius, speedX, speedY, color));
  }

  if (!animationPaused) {
    requestAnimationFrame(draw);
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

resetAnimation();