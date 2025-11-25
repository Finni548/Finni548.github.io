let circleX = [];
let circleY = [];
let circleSize = 100;
let numCircles = 5;

let showMessage = false;   
let messageTimer = 0;      
let messageText = "";      

let attempts = [];          
let active = [];            

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Start
  for (let i = 0; i < numCircles; i++) {
    circleX[i] = random(circleSize / 2, width - circleSize / 2);
    circleY[i] = random(circleSize / 2, height - circleSize / 2);
    attempts[i] = 0;       
    active[i] = true;      
  }
}

function draw() {
  background(255, 209, 220);

  
  fill(255, 0, 150);
  textSize(50);
  textAlign(CENTER, TOP);
  text("Catch me if you can", width / 2, 20);

  fill(100, 0, 200);
  noStroke();

  for (let i = 0; i < numCircles; i++) {
    if (!active[i]) continue; 

    ellipse(circleX[i], circleY[i], circleSize);

    let d = dist(mouseX, mouseY, circleX[i], circleY[i]);

    if (d < circleSize) {
      attempts[i]++;  
      messageTimer = millis();
      showMessage = true;

      if (attempts[i] >= 5) {
        active[i] = false;  
        messageText = "Yes, perfect!";
      } else {
        
        circleX[i] = random(circleSize / 2, width - circleSize / 2);
        circleY[i] = random(circleSize / 2, height - circleSize / 2);
        messageText = "next time";
      }
    }
  }

  if (showMessage && millis() - messageTimer < 1000) {
    fill(0);
    textSize(30);
    textAlign(CENTER, BOTTOM);
    text(messageText, width / 2, height - 20);
  }
}

