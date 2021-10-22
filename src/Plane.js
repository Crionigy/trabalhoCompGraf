class Plane {

    constructor(id, color, x, y, angle) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
        this.angle = angle;
    }

    display() {
        this.setCanvasCartesianPoint(this.x, this.y);
        this.imprimir();
        rectMode(CENTER);
        translate(this.cartesianX, this.cartesianY);
        rotate(this.angle);
        fill(this.color);
        rect(0, 0, 40, 40);
    }

    setCanvasCartesianPoint(x, y) {
        var midWidth = width / 2;
        var midHeight = height / 2;
        var cartesianX = midWidth + x;
        var cartesianY = midHeight + y;

        this.cartesianX = cartesianX;
        this.cartesianY = cartesianY;
    }

    setAngle(angle) {
        this.angle = angle;
    }

    move(x, y, angle) {
        //this.setCanvasCartesianPoint(x, y);
        this.setAngle(angle)
    }

    imprimir() {
        console.log(`Id Plane: ${this.id}, X: ${this.x - (width / 2)}, Y: ${this.y - (height / 2)}, ANGLE: ${this.angle}`)
    }
}