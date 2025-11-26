let font;
let circleX = [];
let circleY = [];
let circleSize = 100;
let numCircles = 5;

let showMessage = false;   
let messageTimer = 0;      
let messageText = "";      

let attempts = [];          
let active = [];            

function preload() {
  font = loadFont('BalloonDreams-BW1Kw.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < numCircles; i++) {
    circleX[i] = random(circleSize / 2, width - circleSize / 2);
    circleY[i] = random(circleSize / 2, height - circleSize / 2);
    attempts[i] = 0;
    active[i] = true;
  }
}

function draw() {
  background(255, 209, 220);

  fill(150, 30, 155);
  textFont(font);
  textSize(50);
  textAlign(CENTER, TOP);
  text("CATCH ME IF YOU CAN", width / 2, 20);

  noStroke();

  for (let i = 0; i < numCircles; i++) {
    if (!active[i]) continue;

    drawBubble(circleX[i], circleY[i], circleSize);

    let d = dist(mouseX, mouseY, circleX[i], circleY[i]);

    if (d < circleSize) {
      attempts[i]++;
      messageTimer = millis();
      showMessage = true;

      if (attempts[i] >= 5) {
        active[i] = false;
        messageText = "YES, PERFECT!";
      } else {
        circleX[i] = random(circleSize / 2, width - circleSize / 2);
        circleY[i] = random(circleSize / 2, height - circleSize / 2);
        messageText = "NEXT TIME";
      }
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
  // Äußere Schicht
  fill(255, 255, 255, 40);
  ellipse(x, y, s * 1.15);

  // Hauptkörper
  fill(180, 200, 255, 120);
  ellipse(x, y, s);

  // Schimmer
  fill(255, 255, 255, 180);
  ellipse(x - s * 0.2, y - s * 0.2, s * 0.35);

  // zarter Rand
  noFill();
  stroke(255, 255, 255, 150);
  strokeWeight(1);
  ellipse(x, y, s);
  noStroke();
}

