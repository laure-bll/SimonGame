class Display {
    constructor() {
        this.count = 0;
        this.init(); // Evite de surcharger le constructeur.
    }

    init() {
        this.counterH2 = document.querySelector('h2');
        this.minusBtn = document.getElementById("minus");
        this.plusBtn = document.getElementById("plus");
    }
}

const display = new Display();