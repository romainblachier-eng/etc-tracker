const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// Constants
const KEYS = {
    UP: ['ArrowUp', 'w', 'W'],
    DOWN: ['ArrowDown', 's', 'S']
};

const COLORS = {
    BG: '#000',
    PADDLE: '#00ff00',
    BALL: '#ffff00',
    LINE: '#00ff00'
};

const GAME = {
    BALL_RADIUS: 8,
    BALL_SPEED: 5,
    PADDLE_SPEED: 6,
    PADDLE_WIDTH: 10,
    PADDLE_HEIGHT: 100,
    PADDLE1_X: 20,
    START_Y_OFFSET: 50
};

const BUTTON_TEXTS = {
    READY: 'Démarrer le jeu',
    RUNNING: 'En cours...'
};

// Game objects
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: GAME.BALL_RADIUS,
    speedX: GAME.BALL_SPEED,
    speedY: GAME.BALL_SPEED
};

const paddle1 = {
    x: GAME.PADDLE1_X,
    y: canvas.height / 2 - GAME.START_Y_OFFSET,
    width: GAME.PADDLE_WIDTH,
    height: GAME.PADDLE_HEIGHT,
    speed: GAME.PADDLE_SPEED
};

const paddle2 = {
    x: canvas.width - 30,
    y: canvas.height / 2 - GAME.START_Y_OFFSET,
    width: GAME.PADDLE_WIDTH,
    height: GAME.PADDLE_HEIGHT,
    speed: GAME.PADDLE_SPEED
};

let score1 = 0;
let score2 = 0;
let gameRunning = false;

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
    startBtn.textContent = BUTTON_TEXTS.RUNNING;
    startBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
    score1 = 0;
    score2 = 0;
    gameRunning = false;
    startBtn.textContent = BUTTON_TEXTS.READY;
    startBtn.disabled = false;
    resetGame();
});

function resetGame() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = GAME.BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = GAME.BALL_SPEED * (Math.random() * 2 - 1);
    paddle1.y = canvas.height / 2 - GAME.START_Y_OFFSET;
    paddle2.y = canvas.height / 2 - GAME.START_Y_OFFSET;
    updateScores();
}

function updateScores() {
    score1Display.textContent = score1;
    score2Display.textContent = score2;
}

function isKeyPressed(keyList) {
    return keyList.some(key => keys[key]);
}

function movePaddle(paddle) {
    if (isKeyPressed(KEYS.UP)) {
        paddle.y = Math.max(0, paddle.y - paddle.speed);
    }
    if (isKeyPressed(KEYS.DOWN)) {
        paddle.y = Math.min(canvas.height - paddle.height, paddle.y + paddle.speed);
    }
}

function handlePaddleInput() {
    movePaddle(paddle1);

    // Player 2 (Right paddle) - Arrows Up/Down only
    const player2Keys = {
        UP: ['ArrowUp'],
        DOWN: ['ArrowDown']
    };

    if (isKeyPressed(player2Keys.UP)) {
        paddle2.y = Math.max(0, paddle2.y - paddle2.speed);
    }
    if (isKeyPressed(player2Keys.DOWN)) {
        paddle2.y = Math.min(canvas.height - paddle2.height, paddle2.y + paddle2.speed);
    }
}

function checkPaddleCollision(paddle, isLeftPaddle) {
    const ballLeft = ball.x - ball.radius;
    const ballRight = ball.x + ball.radius;
    const paddleLeft = paddle.x;
    const paddleRight = paddle.x + paddle.width;
    const ballTop = ball.y;
    const ballBottom = ball.y;
    const paddleTop = paddle.y;
    const paddleBottom = paddle.y + paddle.height;

    const horizontalCollision = isLeftPaddle
        ? ballLeft < paddleRight && ballRight > paddleLeft
        : ballRight > paddleLeft && ballLeft < paddleRight;

    const verticalCollision = ballTop > paddleTop && ballBottom < paddleBottom;

    if (horizontalCollision && verticalCollision) {
        ball.speedX *= -1;
        ball.x = isLeftPaddle ? paddleRight + ball.radius : paddleLeft - ball.radius;
        ball.speedY += (ball.y - (paddle.y + paddle.height / 2)) * 0.1;
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
    checkPaddleCollision(paddle1, true);
    checkPaddleCollision(paddle2, false);

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
    ctx.fillStyle = COLORS.BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center line
    ctx.strokeStyle = COLORS.LINE;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = COLORS.PADDLE;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    // Draw ball
    ctx.fillStyle = COLORS.BALL;
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
