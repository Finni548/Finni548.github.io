let circleX;
let circleY;
let circleSize = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Startposition des Kreises
  circleX = width / 2;
  circleY = height / 2;
}

function draw() {
  background(255, 209, 220);

	// Titel oben mittig
  fill(0);
  textSize(40);
  textAlign(CENTER, TOP);
  text("Catch me if you can", width / 2, 20);

  // Kreis zeichnen
  fill(100, 0, 200);
  noStroke();
  ellipse(circleX, circleY, circleSize);

  // Abstand zur Maus
  let d = dist(mouseX, mouseY, circleX, circleY);

  // Wenn Maus zu nah kommt → Kreis springt weg
  if (d < circleSize) {
    circleX = random(circleSize/2, width - circleSize/2);
    circleY = random(circleSize/2, height - circleSize/2);
  }
}

