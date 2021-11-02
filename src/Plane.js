class Plane {
  constructor(id, color, x, y, raio, angle, direcao, velocidade) {
    this.selected = false;
    this.id = id;
    this.color = color;

    // Coordenadas real do canvas
    this.x = x;
    this.y = y;

    // efeito visual
    this.direcao = direcao;
    this.velocidade = velocidade;

    // coordenadas polares
    this.raio = raio;
    this.angle = angle;

    // coordenadas cartesianas
    this.cartesianX = 0;
    this.cartesianY = 0;

    // rotação
    this.rotation = 0;

    // seta as coordenadas cartesianas ou polar
    this.setCoordenadas();

    this.imageAviao = loadImage("../assets/airplane.png");
  }

  render() {
    push();
    rectMode(CENTER);
    translate(this.cartesianX, this.cartesianY);
    rotate(-this.direcao);
    noFill();
    noStroke();
    image(this.imageAviao, -20, -20);
    rect(0, 0, 40, 40);
    pop();
  }

  setRotation(a) {
    this.direcao = a;
  }

  setCoordenadas() {
    switch (true) {
      case this.x !== 0 || this.y !== 0:
        this.setCanvasCartesianPoint(this.x, this.y);
        break;

      case this.raio !== 0 || this.angle !== 0:
        this.set_X_Y_ByCoordenadaPolar(this.raio, this.angle);
        break;

      default:
        this.setCanvasCartesianPoint(this.x, this.y);
        break;
    }
  }

  setCanvasCartesianPoint(x, y) {
    var midWidth = width / 2;
    var midHeight = height / 2;
    var cartesianX = midWidth + x;
    var cartesianY = midHeight - y;

    this.cartesianX = cartesianX;
    this.cartesianY = cartesianY;
  }

  set_X_Y_ByCoordenadaPolar(raio, angle) {
    let x = raio * cos(angle);
    let y = raio * sin(angle);
    this.setCanvasCartesianPoint(x, y);
  }

  transformacoes(option, x, y, angle) {
    const modos = {
      TRANSLANDAR: "TRANSLANDAR",
      ESCALONAR: "ESCALONAR",
      ROTACIONAR: "ROTACIONAR",
    };

    switch (option) {
      case modos.TRANSLANDAR:
        this.x += x;
        this.y += y;
        this.direcao += angle;
        this.setCoordenadas();
        break;
      case modos.ESCALONAR:
        console.log("esc");
        break;

      case modos.ROTACIONAR:
        this.setRotation((this.direcao += angle));
        break;

      default:
        console.log("default");
        break;
    }
  }

  distanciaParaOAeroporto(distancia){
    let distanciaAeroporto = dist(this.x,this.y, 0, 0);
    if (distanciaAeroporto <= distancia){
      return `Calculo Distancia Aeroporto: ID:${this.id}, X: ${this.x}, Y:${this.y}, Distancia: ${distanciaAeroporto.toFixed(2)} \n`;
    }
  }

  distanciaParaOutroAviao(planeToCompare, distancia){
    let distanciaEntreAvioes = dist(this.x,this.y, planeToCompare.x, planeToCompare.y);
    if (distanciaEntreAvioes <= distancia){
      return `Calculo Distancia Entre Aviões: Distancia entre o Avião: ${this.id} para o Avião: ${planeToCompare.id} é: ${distanciaEntreAvioes.toFixed(2)}\n`;
    }
  }
}
