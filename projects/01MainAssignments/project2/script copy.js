let sliderX;
let sliderY = 200;
let sliderW = 200;
let handleX;

function setup() {
  createCanvas(400, 300);
  sliderX = 100;
  handleX = sliderX + sliderW/2;
}

function draw() {
  background(240);

  // linie
  stroke(0);
  line(sliderX, sliderY, sliderX + sliderW, sliderY);

  // handleX
  fill(200, 50, 150);
  ellipse(handleX, sliderY, 20, 20);

  // Bewegt sich weg
  if (dist(mouseX, mouseY, handleX, sliderY) < 50) {
    handleX = sliderX + random(sliderW); 
  }
}

