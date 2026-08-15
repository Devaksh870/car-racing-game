// ===============================
// CAR RACING GAME
// ===============================

// ===== Game Elements =====

const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

const game = document.getElementById("game");

const player = document.getElementById("player");

const enemy1 = document.getElementById("enemy1");
const enemy2 = document.getElementById("enemy2");

const coin = document.getElementById("coin");

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");
const line4 = document.getElementById("line4");

const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");
const livesText = document.getElementById("lives");
const coinsText = document.getElementById("coins");

const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const finalCoins = document.getElementById("finalCoins");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");

const restartBtn = document.getElementById("restartBtn");


// ===============================
// GAME VARIABLES
// ===============================

let gameRunning = false;

let playerLane = 1;

// Three lanes
const lanes = [20, 85, 150];

let speed = 5;

let score = 0;
let lives = 3;
let coins = 0;
let level = 1;


// ===============================
// ROAD LINE POSITIONS
// ===============================

let lineY = [0, 130, 260, 390];


// ===============================
// ENEMY POSITIONS
// ===============================

let enemy1Y = -100;
let enemy2Y = -350;

let enemy1Lane = 0;
let enemy2Lane = 2;


// ===============================
// COIN POSITION
// ===============================

let coinY = -500;
let coinLane = 1;


// ===============================
// START GAME
// ===============================

startBtn.addEventListener("click", function () {

    startScreen.style.display = "none";

    gameRunning = true;

    gameLoop();
});


// ===============================
// MOVE PLAYER LEFT
// ===============================

function moveLeft() {

    if (!gameRunning) return;

    if (playerLane > 0) {

        playerLane--;

        player.style.left = lanes[playerLane] + "px";
    }
}


// ===============================
// MOVE PLAYER RIGHT
// ===============================

function moveRight() {

    if (!gameRunning) return;

    if (playerLane < 2) {

        playerLane++;

        player.style.left = lanes[playerLane] + "px";
    }
}


// ===============================
// BUTTON CONTROLS
// ===============================

leftBtn.addEventListener("click", moveLeft);

rightBtn.addEventListener("click", moveRight);


// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener("keydown", function (event) {

    if (event.key === "ArrowLeft") {
        moveLeft();
    }

    if (event.key === "ArrowRight") {
        moveRight();
    }

    if (event.key === " ") {

        if (gameRunning) {
            pauseGame();
        } else {
            resumeGame();
        }
    }
});


// ===============================
// MAIN GAME LOOP
// ===============================

function gameLoop() {

    if (!gameRunning) {
        return;
    }


    // ===========================
    // MOVE ROAD LINES
    // ===========================

    lineY[0] += speed;
    lineY[1] += speed;
    lineY[2] += speed;
    lineY[3] += speed;


    // Reset road lines

    if (lineY[0] > 500) {
        lineY[0] = -80;
    }

    if (lineY[1] > 500) {
        lineY[1] = -80;
    }

    if (lineY[2] > 500) {
        lineY[2] = -80;
    }

    if (lineY[3] > 500) {
        lineY[3] = -80;
    }


    // Update road line positions

    line1.style.top = lineY[0] + "px";
    line2.style.top = lineY[1] + "px";
    line3.style.top = lineY[2] + "px";
    line4.style.top = lineY[3] + "px";


    // ===========================
    // MOVE ENEMY CARS
    // ===========================

    enemy1Y += speed;

    enemy2Y += speed + 2;


    enemy1.style.top = enemy1Y + "px";
    enemy2.style.top = enemy2Y + "px";


    // ===========================
    // MOVE COIN
    // ===========================

    coinY += speed;

    coin.style.top = coinY + "px";


    // ===========================
    // ENEMY 1 RESPAWN
    // ===========================

    if (enemy1Y > 550) {

        enemy1Y = -120;

        enemy1Lane = Math.floor(Math.random() * 3);

        enemy1.style.left =
            lanes[enemy1Lane] + "px";

        score++;

        scoreText.innerText = score;
    }


    // ===========================
    // ENEMY 2 RESPAWN
    // ===========================

    if (enemy2Y > 550) {

        enemy2Y = -350;

        enemy2Lane = Math.floor(Math.random() * 3);

        enemy2.style.left =
            lanes[enemy2Lane] + "px";

        score++;

        scoreText.innerText = score;
    }


    // ===========================
    // COIN RESPAWN
    // ===========================

    if (coinY > 550) {

        coinY = -700;

        coinLane = Math.floor(Math.random() * 3);

        coin.style.left =
            lanes[coinLane] + "px";
    }


    // ===========================
    // COLLISION DETECTION
    // ===========================

    enemy1Y =
        checkCollision(
            enemy1,
            enemy1Lane,
            enemy1Y
        );


    if (!gameRunning) {
        return;
    }


    enemy2Y =
        checkCollision(
            enemy2,
            enemy2Lane,
            enemy2Y
        );


    if (!gameRunning) {
        return;
    }


    // ===========================
    // COIN COLLECTION
    // ===========================

    checkCoin();


    // ===========================
    // UPDATE LEVEL
    // ===========================

    updateLevel();


    // ===========================
    // NEXT FRAME
    // ===========================

    requestAnimationFrame(gameLoop);
}


// ===============================
// COLLISION FUNCTION
// ===============================

function checkCollision(enemy, enemyLane, enemyY) {

    if (
        enemyLane === playerLane &&
        enemyY > 350 &&
        enemyY < 460
    ) {

        lives--;

        livesText.innerText = lives;


        // Send enemy back to top

        enemyY = -200;


        // Game Over

        if (lives <= 0) {

            gameOver();
        }
    }


    return enemyY;
}


// ===============================
// COIN COLLECTION
// ===============================

function checkCoin() {

    if (
        coinLane === playerLane &&
        coinY > 350 &&
        coinY < 460
    ) {

        coins++;

        coinsText.innerText = coins;


        // Move coin away

        coinY = -700;


        // New lane

        coinLane =
            Math.floor(Math.random() * 3);


        coin.style.left =
            lanes[coinLane] + "px";
    }
}


// ===============================
// LEVEL SYSTEM
// ===============================

function updateLevel() {

    let newLevel =
        Math.floor(score / 10) + 1;


    if (newLevel > level) {

        level = newLevel;

        levelText.innerText = level;


        // Increase speed

        speed += 1;
    }
}


// ===============================
// PAUSE GAME
// ===============================

function pauseGame() {

    gameRunning = false;
}


// ===============================
// RESUME GAME
// ===============================

function resumeGame() {

    if (!gameRunning) {

        gameRunning = true;

        gameLoop();
    }
}


// ===============================
// GAME OVER
// ===============================

function gameOver() {

    gameRunning = false;


    finalScore.innerText = score;

    finalCoins.innerText = coins;


    gameOverScreen.style.display = "block";
}


// ===============================
// RESTART GAME
// ===============================

function restartGame() {

    location.reload();
}