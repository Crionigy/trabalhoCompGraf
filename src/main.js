let planes = [];
let PLANE_ID_COUNTER = 0;
let widthCanvas = 600;
let heightCanvas = 600;

// Iniciando table
const dynamicTable = new DynamicTable(
  "data-table",
  ["selected", "id", "x", "y", "raio", "angle", "direcao", "velocidade"],
  ["Selecionado", "Id", "X", "Y", "Raio", "Angle", "Direção", "Velocidade"]
);

function setup() {
  const canvas = createCanvas(widthCanvas, heightCanvas);
  canvas.parent("sketch-holder");

  var imagePath = "/assets/desmosGraph.png";
  backgroundImage = loadImage(imagePath);

  angleMode(DEGREES);
}

function draw() {
  background(backgroundImage);

  for (i = 0; i < planes.length; i++) {
    planes[i].render();
  }

  dynamicTable.load(planes);
}

// Inserir Avião
const elementInserirAviao = document.getElementById("inserir");
elementInserirAviao.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  planes.push(
    new Plane(
      PLANE_ID_COUNTER,
      parseInt(data.x),
      parseInt(data.y),
      parseInt(data.raio),
      parseInt(data.angle),
      parseInt(data.direcao),
      parseInt(data.velocidade)
    )
  );
  PLANE_ID_COUNTER++;
});

// Transormações
const elementAplicarTransformacao = document.getElementById("transformacao");
elementAplicarTransformacao.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  for (let index = 0; index < planes.length; index++) {
    planes[index].transformacoes(
      data.option,
      parseFloat(data.x),
      parseFloat(data.y),
      parseFloat(data.angle)
    );
  }
});


// Distancia para o Aeroporto
const elementDistanciaMinAeroporto = document.getElementById("distancia-aeroporto");
const TextAreaResultadosDistancias = document.getElementById("resultados-distancias");
elementDistanciaMinAeroporto.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  for (let index = 0; index < planes.length; index++) {
    let resultCalculoDistancia = planes[index].distanciaParaOAeroporto(
      parseInt(data.distancia_min_aeroporto)
    );
    resultCalculoDistancia
      ? TextAreaResultadosDistancias.append(resultCalculoDistancia)
      : undefined;
  }
});

// Distancia entre os Aviões
const elementDistanciaAvioesProximos = document.getElementById("distancia-avioes-proximos");
elementDistanciaAvioesProximos.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  for (i = 0; i < planes.length; i++) {
    for (k = i + 1; k < planes.length; k++) {
      let resultCalculoDistancia = planes[i].distanciaParaOutroAviao(planes[k], parseInt(data.distancia_avioes_proximos));
      resultCalculoDistancia
        ? TextAreaResultadosDistancias.append(resultCalculoDistancia)
        : undefined;
    }
  }
});