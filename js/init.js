
/**
 * INITIALISATION (getters) :
 * Initialise les propriétés du tableau de bord (points, niveau, taille de la séquence).
 * Récupère tous les éléments du DOM à utiliser pour le déroulement du jeu.
 */
export default class Init {
    constructor() {
        this.points = 0;
        this.level = 1;
        this.sequenceLength = 4;

        this.init();
    }

    /**
     * Récupère tous les élements du DOM nécessaires au jeu :
     * - le tableau de bord : points, niveau et taille de la séquence
     * - les touches cliquables (4 quartiers)
     * - le décompte centrale de la séquence
     * - le terrain de jeu (contenant les éléments cliquables).
     */
    init() {
        this.getDashBoardElements()
        this.getBoardGameElements();
        this.getButtonElements();
        this.getPlayGroundElement();
    }

    getDashBoardElements() {
        // Récupère les 3 informations de jeu (points, niveau, taille de la séquence).
        this.pointsElement = document.getElementById("points");
        this.levelElement = document.getElementById("level");
        this.sequenceElement = document.getElementById("sequence");
    }

    getBoardGameElements() {
        // Récupère les 4 éléments cliquables dans un tableau (quartiers) ...
        this.quarters = [
            document.getElementById("quarter-0"),
            document.getElementById("quarter-1"),
            document.getElementById("quarter-2"),
            document.getElementById("quarter-3"),
        ];
        // ... et le compteur central du plateau.
        this.counterElement = document.getElementById("count");
    }

    getButtonElements() {
        // Récupère les boutons "play" et "reset".
        this.playButton = document.getElementById("play");
        this.resetButton = document.getElementById("reset");
    }

    getPlayGroundElement() {
        // Récupère la zone de jeu contenant les éléments cliquables.
        this.playground = document.getElementById("playground");
    }
}