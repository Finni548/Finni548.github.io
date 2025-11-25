let sliderX;
let sliderY = 200;
let sliderW = 200;
let handleX;

function setup() {
  createCanvas(400, 300);
	// windowWidth, windowHeight
  sliderX = 100;
  handleX = sliderX + sliderW/2;
}

function draw() {
  background(240);

  drawSpeakerIcon(sliderX - 40, sliderY, 1);

  drawSpeakerIcon(sliderX + sliderW + 40, sliderY, 2);

  //Linie
  stroke(0);
  line(sliderX, sliderY, sliderX + sliderW, sliderY);

  //handleX
  fill(200, 50, 150);
  noStroke();
  ellipse(handleX, sliderY, 20, 20);

  // Bewegt sich weg 
  if (dist(mouseX, mouseY, handleX, sliderY) < 50) {
    handleX = sliderX + random(sliderW);
  }
}

// Einfache Lautsprecher 
function drawSpeakerIcon(x, y, waves) {
  stroke(0);
  strokeWeight(2);

  // Speaker box
  line(x - 10, y - 10, x - 10, y + 10);
  line(x - 10, y - 10, x, y - 5);
  line(x - 10, y + 10, x, y + 5);
  line(x, y - 5, x, y + 5);

  // Waves
  if (waves >= 1) {
    noFill();
    arc(x + 5, y, 10, 10, -0.5, 0.5);
  }
  if (waves >= 2) {
    arc(x + 10, y, 20, 20, -0.5, 0.5);
  }
}

