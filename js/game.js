export default class Game {
    constructor() {
        this.points = 0;
        this.level = 1;
        this.sequence = 4;

        this.init();
    }

    /**
     * Récupère tous les élements du DOM nécessaires au jeu :
     * - le tableau de bord : points, niveau et taille de la séquence
     * - les touches cliquables (4 quartiers)
     * - le décompte centrale de la séquence
     */
    init() {
        this.getDashBoardElements()
        this.getBoardGameElements();
        this.getButtonElements();
    }

    getDashBoardElements() {
        // Récupère les 3 informations de jeu (points, niveau, taille de la séquence).
        this.pointsElement = document.getElementById("points");
        this.levelElement = document.getElementById("level");
        this.sequenceElement = document.getElementById("sequence");
    }

    getBoardGameElements() {
        // Récupère les 4 éléments cliquables (quartiers) ...
        this.quarterElement0 = document.getElementById("quarter-0");
        this.quarterElement1 = document.getElementById("quarter-1");
        this.quarterElement2 = document.getElementById("quarter-2");
        this.quarterElement3 = document.getElementById("quarter-3");
        // ... et le compteur central du plateau.
        this.counterElement = document.getElementById("count");
    }

    getButtonElements() {
        // Récupère les boutons "play" et "reset".
        this.playButton = document.getElementById("play");
        this.resetButton = document.getElementById("reset");
    }
}