let cols, rows;
let scl = 20;
let w = 1400;
let h = 1000;

let bX = 700;
let bY = 500;
let bAngleX = 0;
let bAngleY = 0;

let img;

let terrain = [];

let flying = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  frameRate(10);
  cols = w / scl;
  rows = h / scl;

   for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
      }
   }
}

function draw() {
  orbitControl();
  
  drawWave();
  
  bAngleX = PI/2-atan2(2*scl, terrain[bX/scl][bY/scl+1] - terrain[bX/scl][bY/scl-1]);
  bAngleY = PI/2-atan2(2*scl, terrain[bX/scl-1][bY/scl] - terrain[bX/scl+1][bY/scl]);
  drawBoat(bX, bY, terrain[bX/scl][bY/scl]+7, bAngleX, bAngleY);
  
  drawMoon(450, 250, 200, 40, 0);
  keyCheck();
}

function keyCheck() {
  if (keyIsDown(LEFT_ARROW)&& bX > 20) bX += -scl;
  if (keyIsDown(RIGHT_ARROW)&& bX < w) bX += scl;
  if (keyIsDown(UP_ARROW)  && bY > 20) bY += -scl;
  if (keyIsDown(DOWN_ARROW) && bY < h) bY += scl;
}

function drawWave() {
    flying -= 0.1;
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    var xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -200, 200);
      xoff += 0.03;
    }
    yoff += 0.03;
  }
  
  translate(0,50);
  rotateX(PI/3);
  background(24, 25, 55);
  stroke(100, 150, 255);
  fill(0, 140, 255);
  translate(-w/2, -h/2);
  //ambientMaterial(0, 140, 255);
  
  
  for (let y = 0; y < rows -1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
}

function drawBoat(x, y, z, angleX, angleY) {
  push();  
  translate(x, y, z);
  ambientMaterial(150, 70, 0);
  ambientLight(100);
  pointLight(255, 255, 255, bX, bY, 100);
  rotateX(angleX);
  rotateY(angleY);
  fill(150,70,0);
  stroke(2);
  
  beginShape(QUAD_STRIP);
  vertex(-15, -50, 30);
  vertex(15, -50, 30);
  vertex(-20, -30, 0);
  vertex(20, -30, 0);  
  vertex(-20, 45, 0);
  vertex(20, 45, 0);  
  endShape();
  
  beginShape(QUAD_STRIP);
  vertex(-25, -30, 30);
  vertex(-20, -30, 0);  
  vertex(-25, 50, 30);
  vertex(-20, 45, 0);  
  vertex(25, 50, 30);
  vertex(20, 45, 0);  
  vertex(25, -30, 30);
  vertex(20, -30, 0);  
  endShape();
  
  beginShape(TRIANGLES);
  vertex(-15, -50, 30);
  vertex(-20, -30, 0);
  vertex(-25, -30, 30);
  endShape();
  
  beginShape(TRIANGLES);
  vertex(15, -50, 30);
  vertex(20, -30, 0);
  vertex(25, -30, 30);
  endShape();
  pop();
}

function drawMoon(x, y, z, size, light) {
  push();
  translate(x, y, z);
  noStroke();
  fill(255, 255, 20);
  
  sphere(size);
  
  ambientLight(255, 255, 255);
  pointLight(255, 255, 255, 0, 0, 100);
  pop();
}
