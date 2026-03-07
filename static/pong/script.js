const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// Game objects
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    speedX: 5,
    speedY: 5
};

const paddle1 = {
    x: 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 6,
    dy: 0
};

const paddle2 = {
    x: canvas.width - 30,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 6,
    dy: 0
};

let score1 = 0;
let score2 = 0;
let gameRunning = false;
let gameStarted = false;

const keys = {};

// Event listeners for keyboard input
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

startBtn.addEventListener('click', () => {
    gameRunning = true;
    gameStarted = true;
    startBtn.textContent = 'En cours...';
    startBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
    score1 = 0;
    score2 = 0;
    gameRunning = false;
    gameStarted = false;
    startBtn.textContent = 'Démarrer le jeu';
    startBtn.disabled = false;
    resetGame();
});

function resetGame() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = 5 * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = 5 * (Math.random() * 2 - 1);
    paddle1.y = canvas.height / 2 - 50;
    paddle2.y = canvas.height / 2 - 50;
    updateScores();
}

function updateScores() {
    score1Display.textContent = score1;
    score2Display.textContent = score2;
}

function handlePaddleInput() {
    // Player 1 (Left paddle) - Arrows Up/Down or W/S
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
        paddle1.y = Math.max(0, paddle1.y - paddle1.speed);
    }
    if (keys['ArrowDown'] || keys['s'] || keys['S']) {
        paddle1.y = Math.min(canvas.height - paddle1.height, paddle1.y + paddle1.speed);
    }

    // Player 2 (Right paddle) - Arrows Up/Down only
    if (keys['ArrowUp']) {
        paddle2.y = Math.max(0, paddle2.y - paddle1.speed);
    }
    if (keys['ArrowDown']) {
        paddle2.y = Math.min(canvas.height - paddle2.height, paddle2.y + paddle1.speed);
    }
}

function updateBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with top and bottom
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.speedY *= -1;
        ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
    }

    // Ball collision with paddles
    if (
        ball.x - ball.radius < paddle1.x + paddle1.width &&
        ball.y > paddle1.y &&
        ball.y < paddle1.y + paddle1.height
    ) {
        ball.speedX *= -1;
        ball.x = paddle1.x + paddle1.width + ball.radius;
        ball.speedY += (ball.y - (paddle1.y + paddle1.height / 2)) * 0.1;
    }

    if (
        ball.x + ball.radius > paddle2.x &&
        ball.y > paddle2.y &&
        ball.y < paddle2.y + paddle2.height
    ) {
        ball.speedX *= -1;
        ball.x = paddle2.x - ball.radius;
        ball.speedY += (ball.y - (paddle2.y + paddle2.height / 2)) * 0.1;
    }

    // Score points
    if (ball.x < 0) {
        score2++;
        updateScores();
        resetGame();
    }
    if (ball.x > canvas.width) {
        score1++;
        updateScores();
        resetGame();
    }
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center line
    ctx.strokeStyle = '#00ff00';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    // Draw ball
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    if (gameRunning) {
        handlePaddleInput();
        updateBall();
    }

    drawGame();
    requestAnimationFrame(gameLoop);
}

// Initialize
resetGame();
gameLoop();
