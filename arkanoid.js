var canvas = document.getElementById("area");
var ctx = canvas.getContext('2d');

var right;
var left;
var a;
var d;

function keyDownHandler(event) {
	if (event.keyCode == 39) {
		right = true;
	}

	if (event.keyCode == 37) {
		left = true;
	}

	if (event.keyCode == 68) {
		d = true;
	}

	if (event.keyCode == 65) {
		a = true;
	}
}

function keyUpHandler(event) {
	if (event.keyCode == 39) {
		right = false;
	}

	if (event.keyCode == 37) {
		left = false;
	}

	if (event.keyCode == 68) {
		d =	 false;
	}

	if (event.keyCode == 65) {
		a = false;
	}
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);


var ball = {
	x : canvas.width/2,
	y : canvas.height/2,
	raio : 15,
	dx : 3.5,
	dy : -3.5,
	speed : 5,
	color : "white"
}

var net = {
	x : 0,
	y : (canvas.height - 2)/2,
	width : 10,
	height : 2,
	color : "white"
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.raio, 0, Math.PI*2);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();	
}

function drawRect(x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

function createPaddle(px, py, pw, ph, pdx, color) {
	this.pw = pw;
	this.ph = ph;
	this.px = px;
	this.py = py;
	this.ps = 0;
	this.pdx = 5;

}

var paddle_1 = new createPaddle((canvas.width-100)/2, canvas.height - 20, 100, 15, 5, "white");
var paddle_2 = new createPaddle((canvas.width-100)/2, 5, 100, 15, 5, "white");

function drawPaddle(paddle) {
	ctx.beginPath();
	ctx.fillStyle = paddle.cor;
	ctx.rect(paddle.px, paddle.py, paddle.pw, paddle.ph);
	ctx.fill();
	ctx.closePath();
}
function drawNet() {
	for (var i = 0; i <canvas.width; i+=15) {
		drawRect(net.x + i, net.y, net.width, net.height, net.color);
	}
}

function draw() {
	drawRect(0, 0, canvas.width, canvas.height, "#000");

	drawBall();

	if (ball.x + ball.dx > canvas.width - ball.raio || ball.x + ball.dx < ball.raio) {
		ball.dx = -ball.dx;
	}

	if (ball.y + ball.dy  > canvas.height - paddle_1.ph - ball.raio &&
	   	ball.x + ball.dx > paddle_1.px &&
	   	ball.x + ball.dx < paddle_1.px + paddle_1.pw) {
		ball.dy = -ball.dy;
	}

	ball.x += ball.dx;
	ball.y += ball.dy;

	drawPaddle(paddle_1);
	drawPaddle(paddle_2);

	if (right && (paddle_1.px + paddle_1.pw) < canvas.width - 5) {
		paddle_1.px += paddle_1.pdx;
	}

	if (left && paddle_1.px > 5) {
		paddle_1.px -= paddle_1.pdx;
	}

	if (d && (paddle_2.px + paddle_2.pw) < canvas.width - 5) {
		paddle_2.px += paddle_2.pdx;
	}

	if (a && (paddle_2.px > 5)) {
		paddle_2.px -= paddle_2.pdx;
	}

	drawNet();

	requestAnimationFrame(draw);

}

requestAnimationFrame(draw);
