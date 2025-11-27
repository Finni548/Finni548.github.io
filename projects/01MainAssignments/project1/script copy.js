let font;
let rotation = false;
let balloonColor;
let depth = 20;

let exploded = false;
let points = [];
let particles = [];
let fontSize;

function preload() {
  font = loadFont('BalloonDreams-BW1Kw.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  fontSize = width / 8;
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);

  balloonColor = color(255, 170, 200);

  // Text zu Punkten umwandeln
  points = font.textToPoints("Vive Ahora", -width/8, 0, fontSize, {
    sampleFactor: 0.17
  });
}

function draw() {
  background(random(100, 255), random(100, 255), random(100, 255));
  orbitControl();

  ambientLight(80);
  pointLight(200, 200, 255, -300, -200, 400);

  let mx = map(mouseX, 0, width, -300, 300);
  let my = map(mouseY, 0, height, -300, 300);
  pointLight(255, 255, 255, mx, my, 300);

  if (exploded) {
    rotateX(-HALF_PI);

    noStroke();
    for (let p of particles) {
      push();
      translate(p.pos.x, p.pos.y, p.pos.z);
      ambientMaterial(p.color);
      sphere(4);
      pop();

      p.pos.add(p.vel);
      p.vel.mult(0.97);
    }
    return; 
  }

  if (rotation) {
    rotateX(frameCount / 150);
    rotateZ(mouseX / 1000);
  } else {
    rotateX(20);
  }

  rotateX(-HALF_PI);

  for (let i = 0; i < depth; i++) {
    push();
    translate(0, 0, -i);

    specularMaterial(balloonColor);
    shininess(100);

    text("Vive Ahora", 0, 0);
    pop();
  }

  push();
  specularMaterial(balloonColor);
  shininess(150);
  text("Vive Ahora", 0, 0);
  pop();
}

function mousePressed() {
   rotation = !rotation;
}

function keyPressed() {
  if (key === '1') {
    balloonColor = color(random(255), random(255), random(255));
  } else if (!exploded) {
    exploded = true;

    particles = [];

    for (let pt of points) {
      let angle = random(TWO_PI);
      let speed = random(5, 14);

      particles.push({
        pos: createVector(pt.x, pt.y, 0),
        vel: createVector(
          cos(angle) * speed,
          sin(angle) * speed,
          random(-6, 6)
        ),
        color: color(
          red(balloonColor) + random(-30, 30),
          green(balloonColor) + random(-30, 30),
          blue(balloonColor) + random(-30, 30)
        )
      });
    }
  } else if (key === '3') {
    exploded = false;
    particles = [];

    points = font.textToPoints("Vive Ahora", -width/8, 0, fontSize, {
      sampleFactor: 0.17
    });
  }
}


