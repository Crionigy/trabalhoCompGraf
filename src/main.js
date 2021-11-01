let planes = [];
let PLANE_ID_COUNTER = 0;
let widthCanvas = 600;
let heightCanvas = 600;

function setup() {
  const canvas = createCanvas(widthCanvas, heightCanvas);
  canvas.parent('sketch-holder');
  
  var imagePath = '/assets/desmosGraph.png';
  backgroundImage = loadImage(imagePath);

  angleMode(DEGREES);
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

// Iniciando table
const dynamicTable = new DynamicTable('data-table', ['selected', 'x', 'y', 'raio', 'angle', 'direcao', 'velocidade'], ['Selecionado', 'X', 'Y', 'Raio', 'Angle', 'Direção', 'Velocidade']);

// Inserir Avião
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
      parseInt(data.raio),
      parseInt(data.angle),
      parseInt(data.direcao),
      parseInt(data.velocidade)
    )
  );
  PLANE_ID_COUNTER++;
  dynamicTable.load(planes);
});