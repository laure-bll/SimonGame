class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    calculatePerimeter() {
        return 2 * (this.width + this.height);
    }

    calculateArea() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
    }
}

const rect = new Rectangle(20, 20);
const square = new Square(20);
const area = square.calculateArea();
const perimeter = square.calculatePerimeter();

console.log(square, {area, perimeter});