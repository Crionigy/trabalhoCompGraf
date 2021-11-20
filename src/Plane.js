class Plane {
  constructor(id, x, y, raio, angle, direcao, velocidade) {
    this.selected = false;
    this.id = id;

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
        this.setXYByCoordenadaPolar(this.raio, this.angle);
        break;

      default:
        this.setCanvasCartesianPoint(this.x, this.y);
        break;
    }
  }

  setRaioAnguloByCoordenadaCartesian(x, y) {
    this.raio = parseFloat(
      Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)).toFixed(4)
    );
    this.angle = isNaN(parseFloat(Math.atan((y / x)).toFixed(4))) ? 0 : parseFloat(Math.atan(y / x).toFixed(4));
  }

  setXYByCoordenadaPolar(raio, angle) {
    let x = raio * cos(angle);
    let y = raio * sin(angle);
    
    this.x = parseFloat(x.toFixed(4));
    this.y = parseFloat(y.toFixed(4));

    this.setCanvasCartesianPoint(this.x, this.y);
  }
  
  setCanvasCartesianPoint(x, y) {
    var midWidth = width / 2;
    var midHeight = height / 2;
    var cartesianX = midWidth + x;
    var cartesianY = midHeight - y;

    this.cartesianX = cartesianX;
    this.cartesianY = cartesianY;

    // this.setRaioAnguloByCoordenadaCartesian(x, y);
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
        this.x *= x;
        this.y *= y;
        this.setCoordenadas();
        break;

      case modos.ROTACIONAR:
        this.x -= x;
        this.y -= y;
        this.direcao += angle;
        this.setCoordenadas();
        this.x += x;
        this.y += y;
        this.setCoordenadas();
        break;

      default:
        toastr.warning("Selecione uma das opções disponiveis");
        break;
    }
  }

  distanciaParaOAeroporto(distancia) {
    let distanciaAeroporto = dist(this.x, this.y, 0, 0);
    if (distanciaAeroporto <= distancia) {
      return `Calculo Distancia Aeroporto: ID:${this.id}, X: ${this.x}, Y:${
        this.y
      }, Distancia: ${distanciaAeroporto.toFixed(4)} \n`;
    }
    return "";
  }

  distanciaParaOutroAviao(planeToCompare, distancia) {
    let distanciaEntreAvioes = dist(
      this.x,
      this.y,
      planeToCompare.x,
      planeToCompare.y
    );
    if (distanciaEntreAvioes <= distancia) {
      return `Calculo Distancia Entre Aviões: Distancia entre o Avião: ${
        this.id
      } para o Avião: ${planeToCompare.id} é: ${distanciaEntreAvioes.toFixed(
        4
      )} \n`;
    }
    return "";
  }
}
