let cols, rows;
let scl = 20;
let w = 1400;
let h = 1000;

let terrain = [];

let flying = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
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
  
  flying -= 0.1;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  
  translate(0,50);
  rotateX(PI/3);
  background(0);
  stroke(255);
  noFill();
  translate(-w/2, -h/2);
  
  
  for (let y = 0; y < rows -1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
  drawBoat(mouseX, mouseY, 100, 0);
}

function drawBoat(x, y, z, rotation) {
  push();
  rotate(rotation);
  translate(x, y, z);
  fill(150,70,0);
  
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
