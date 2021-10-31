class Plane {
  constructor(id, color, x, y, raio, angle, direcao, velocidade) {
    // raioTriangulo
    this.raioTriangulo = 10;
    this.color = color;

    // Coordenadas
    this.id = id;
    this.x = x;
    this.y = y;
    this.raio = raio;
    this.angle = angle;

    // efeito visual
    this.direcao = direcao;
    this.velocidade = velocidade;

    this.cartesianX = 0;
    this.cartesianY = 0;

    this.rotation = 0;

    this.setCoordenadas();
  }

  render() {
    push();
    rectMode(CENTER);
    translate(this.cartesianX, this.cartesianY);
    rotate(-this.direcao);
    fill(0);
    stroke(255);
    // triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    rect(0, 0, 40, 10);
    pop();
  }

  edges() {
    if (this.cartesianX > width + this.raioTriangulo) {
      this.cartesianX = -this.raioTriangulo;
    } else if (this.cartesianX < -this.raioTriangulo) {
      this.cartesianX = width + this.raioTriangulo;
    }
    if (this.cartesianY > height + this.raioTriangulo) {
      this.cartesianY = -this.raioTriangulo;
    } else if (this.cartesianY < -this.raioTriangulo) {
      this.cartesianY = height + this.raioTriangulo;
    }
  }

  setRotation(a) {
    this.rotation = a;
  }

  turn() {
    this.direcao += this.rotation;
  }

  setCoordenadas() {
    switch (true) {
      case (this.x !== 0 || this.y !== 0 ):
        this.setCanvasCartesianPoint(this.x, this.y);
        break;

      case (this.raio !== 0  || this.angle !== 0 ):
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
}
