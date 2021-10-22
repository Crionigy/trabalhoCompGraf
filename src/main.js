let planes = [];
let PLANE_ID_COUNTER = 0;


function setup() {
    createCanvas(800, 800);

    //constructor expects id, color, x, y, angle
    planes.push(new Plane(0, "silver", 0, 0, 0));
    planes.push(new Plane(1, "green", 100, 0, 0));
}

function draw() {
    background(51);
    
    planes.forEach((plane) => plane.display());
    // display
    // planes.forEach((plane) => plane.display());
    // planes.forEach((plane) => plane.move(plane.x, plane.y, plane.angle));
}



// Inserir Objeto
const element = document.getElementById('inserir');
element.addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    let plane = new Plane(PLANE_ID_COUNTER, gerarCor(), parseInt(data.x), parseInt(data.y), parseInt(data.angle));
    planes.push(plane);
    PLANE_ID_COUNTER++;
});