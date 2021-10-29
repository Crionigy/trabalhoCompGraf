let planes = [];
let PLANE_ID_COUNTER = 0;
let widthCanvas = 600;
let heightCanvas = 600;

let angle = 0;

let vPlanes = [];

function setup() {
    createCanvas(widthCanvas, heightCanvas);
}

function draw() {
    background(51);

    push();
    
    translate(widthCanvas / 2, heightCanvas /2);
    rectMode(CENTER);

    for (let i = 0; i < vPlanes.length; i++) {
        rect(vPlanes[i].x, vPlanes[i].y, 40, 40);        
    }

    pop();
}

// Inserir Objeto
const element = document.getElementById('inserir');
element.addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    let plane = new Plane(PLANE_ID_COUNTER, gerarCor(), parseInt(data.x), parseInt(data.y), parseInt(data.angle));
    vPlanes.push(data);
    PLANE_ID_COUNTER++;
});