let planes = [];
let PLANE_ID_COUNTER = 0;
let widthCanvas = 600;
let heightCanvas = 600;

function setup() {
  createCanvas(widthCanvas, heightCanvas);
  backgroundImage = loadImage("../assets/desmos-graph.png");
}

function draw() {
  background(backgroundImage);

  for (i = 0; i < planes.length; i++) {
    planes[i].render();
    planes[i].turn();
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    for (i = 0; i < planes.length; i++) {
      planes[i].setRotation(0.1);
    }
  }
}

// Inserir Objeto
const element = document.getElementById("inserir");
element.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  planes.push(
    new Plane(
      PLANE_ID_COUNTER,
      gerarCor(),
      parseInt(data.x),
      parseInt(data.y),
      parseInt(data.angle)
    )
  );
  PLANE_ID_COUNTER++;
});
