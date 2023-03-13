"use strict";
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2; // POSICIÓN INICIAL
let y = canvas.height - 30;

let dx = 2; // DESPLAZAMIENTO
let dy = -2;

let ballColor = "#0095DD";
let ballRadius = 10; // RADIO
let ballSpeed = 10;
let interval = setInterval(draw, ballSpeed);
let ballShape = () => drawBall();

let rndColor = false;
let rndShape = false;
let incSpeed = false;

// Pala
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleColor = "#0095DD";
let rightPressed = false;
let leftPressed = false;

// Listeners para la pala
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) { // DETERMINAMOS QUE SE ESTÁ PULSANDO UNA TECLA (RECUERDA: e CONTIENE INFORMACIÓN SOBRE QUIÉN ORIGINA EL EVENTO)
    if (e.key == "ArrowRight") { // CURSOR DERECHO
        rightPressed = true;
    } else if (e.key == "ArrowLeft") { // CURSOR IZQUIERDO
        leftPressed = true;
    }
}

function keyUpHandler(e) { // DETERMINAMOS QUE SE HA DEJADO DE PULSAR UNA TECLA 
    if (e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}

function drawBall() { // DIBUJAMOS LA PELOTA
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawSquare() {
    ctx.beginPath()
    ctx.fillRect(x, y, -ballRadius, -ballRadius);
    ctx.fillRect(x, y, ballRadius, ballRadius);
    ctx.fillRect(x, y, ballRadius, -ballRadius);
    ctx.fillStyle = ballColor;
    ctx.fillRect(x, y, -ballRadius, ballRadius);
    ctx.fill();
    ctx.closePath();
}

function drawTriangle() {
    ctx.beginPath()
    ctx.fillRect(x, y, -ballRadius, -ballRadius);
    ctx.fillRect(x, y, ballRadius, ballRadius);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // CHOCA CON EL LATERAL DERECHO          CHOCA CON EL LATERAL IZQUIERDO
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { // RECUERDA: EL CANVAS ESTÁ PEGANDO AL LATERAL IZQUIERDO
        dx = -dx; // CAMBIO LA DIRECCIÓN
        
    } // CHOCA CON EL TECHO
    if (y + dy < ballRadius) { // RECUERDA: EL CANVAS ESTÁ PEGANDO A LA PARTE SUPERIOR
        dy = -dy; // CAMBIO LA DIRECCIÓN
    } else if (y + dy > canvas.height - ballRadius - paddleHeight) { // CHOCA CON LA BASE
        if (x > paddleX && x < paddleX + paddleWidth) { // HA CHOCADO CON LA PARTE DE LA BASE DÓNDE ESTÁ LA PALETA
            dy = -dy; // CAMBIO LA DIRECCIÓN
            if (rndColor) paddleColor = generateRndColor();
            if (rndShape) generateRndShape();
            if (incSpeed) changeSpeed(ballSpeed - 1);
        } else {
            // alert("GAME OVER"); // HA CHOCADO CON LA BASE
            document.location.reload();
        }
    }
    
    x += dx; // SOLO ACTUALIZAMOS LA POSICIÓN DE LA PELOTA, LA PALETA NO SE MUEVE
    y += dy;

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    ballShape();
    drawPaddle();
}

// EXTENSIÓN DEL EJERCICIO

function generateRndColor() { return "#" + Math.floor(Math.random()*16777215).toString(16); };

function generateRndShape() {
    let option = Math.floor(Math.random() * 3);

    if (option == 0) ballShape = () => drawSquare();
    if (option == 1) ballShape = () => drawBall();
    if (option == 2) ballShape = () => drawTriangle();
}

function changeSpeed(speed){
    let rangeSpeed = document.getElementById('speed');
    ballSpeed = speed ?? rangeSpeed.value;
    if (speed) rangeSpeed.value = speed;
    if (ballSpeed < 0) ballSpeed = 0;
    clearInterval(interval);
    interval = setInterval(draw, ballSpeed);
}

const incSpeedOnTouch = (e) => incSpeed = e;
const changeColor = (e) => rndColor = e;
const changeShape = (e) => rndShape = e;