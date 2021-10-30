class Plane {
  constructor(id, color, x, y, angle) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = angle;
    this.r = 10;
    this.cartesianX = 0;
    this.cartesianY = 0;
    this.rotation = 0;
    this.setCanvasCartesianPoint(this.x, this.y);
  }

  render() {
    push();
    rectMode(CENTER);
    translate(this.cartesianX, this.cartesianY);
    rotate(this.angle);
    fill(0);
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  }

  edges() {
    if (this.cartesianX > width + this.r) {
      this.cartesianX = -this.r;
    } else if (this.cartesianX < -this.r) {
      this.cartesianX = width + this.r;
    }
    if (this.cartesianY > height + this.r) {
      this.cartesianY = -this.r;
    } else if (this.cartesianY < -this.r) {
      this.cartesianY = height + this.r;
    }
  }

  setRotation(a) {
    this.rotation = a;
  }

  turn() {
    this.angle += this.rotation;
  }

  setCanvasCartesianPoint(x, y) {
    var midWidth = width / 2;
    var midHeight = height / 2;
    var cartesianX = midWidth + x;
    var cartesianY = midHeight - y;

    this.cartesianX = cartesianX;
    this.cartesianY = cartesianY;
  }
}
