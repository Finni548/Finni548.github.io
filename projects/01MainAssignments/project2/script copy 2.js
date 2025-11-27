let font;
let circleX = [];
let circleY = [];
let circleSize = 100;
let numCircles = 5;

let circleVX = [];
let circleVY = [];

let showMessage = false;
let messageTimer = 0;
let messageText = "";

let active = [];

let bgFlash = false;
let bgFlashStart = 0;

function preload() {
  font = loadFont('BalloonDreams-BW1Kw.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < numCircles; i++) {
    circleX[i] = random(circleSize / 2, width - circleSize / 2);
    circleY[i] = random(circleSize / 2, height - circleSize / 2);

    circleVX[i] = random(-3, 3);
    circleVY[i] = random(-3, 3);

    active[i] = true;
  }
}

function draw() {

  if (bgFlash && millis() - bgFlashStart < 200) {
    background(255, 60, 180); 
  } else {
    background(255, 209, 220);  
    bgFlash = false;
  }

  fill(150, 30, 155);
  textFont(font);
  textSize(50);
  textAlign(CENTER, TOP);
  text("CATCH ME IF YOU CAN", width / 2, 20);

  noStroke();

  for (let i = 0; i < numCircles; i++) {
    if (!active[i]) continue;

    circleX[i] += circleVX[i];
    circleY[i] += circleVY[i];

    if (circleX[i] < circleSize/2 || circleX[i] > width - circleSize/2) {
      circleVX[i] *= -1;
    }
    if (circleY[i] < circleSize/2 || circleY[i] > height - circleSize/2) {
      circleVY[i] *= -1;
    }

    drawBubble(circleX[i], circleY[i], circleSize);

    let d = dist(mouseX, mouseY, circleX[i], circleY[i]);

    if (d < circleSize) {

      let catchChance = random();

      if (catchChance < 0.15) {

        active[i] = false;
        messageText = "YES, PERFECT!";
        bgFlash = true;
        bgFlashStart = millis();
      } else {
       
        messageText = "NEXT TIME";

        circleX[i] = random(circleSize / 2, width - circleSize / 2);
        circleY[i] = random(circleSize / 2, height - circleSize / 2);

        circleVX[i] = random(-3, 3);
        circleVY[i] = random(-3, 3);
      }

      messageTimer = millis();
      showMessage = true;
    }
  }

  if (showMessage && millis() - messageTimer < 1000) {
    textFont(font);
    fill(150, 30, 155);
    textSize(30);
    textAlign(CENTER, BOTTOM);
    text(messageText, width / 2, height - 20);
  }
}

function drawBubble(x, y, s) {
  fill(255, 255, 255, 40);
  ellipse(x, y, s * 1.15);

  fill(180, 200, 255, 120);
  ellipse(x, y, s);

  fill(255, 255, 255, 180);
  ellipse(x - s * 0.2, y - s * 0.2, s * 0.35);

  noFill();
  stroke(255, 255, 255, 150);
  strokeWeight(1);
  ellipse(x, y, s);
  noStroke();
}
