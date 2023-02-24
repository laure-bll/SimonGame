
/**
 * INITIALISATION (getters) :
 * Définit les propriétés du tableau de bord (points, niveau, taille séquence) et le compteur.
 * Récupère tous les éléments du DOM à utiliser pour le déroulement du jeu.
 */
export default class Init {
    constructor() {
        this.points = 0;
        this.level = 1;
        this.sequenceLength = 4;
        this.counter = this.sequenceLength;

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
        this.getBodyElement();
        this.getDashBoardElements()
        this.getBoardGameElements();
        this.getButtonElements();
        this.getPlayGroundElement();
        this.getMessageElement();
    }

    getDashBoardElements() {
        // Récupère les 3 informations de jeu (points, niveau, taille séquence).
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
        this.startButton = document.getElementById("play");
        this.resetButton = document.getElementById("reset");
    }

    getPlayGroundElement() {
        // Récupère la zone de jeu contenant les éléments cliquables.
        this.playground = document.getElementById("playground");
    }

    getBodyElement() {
        // Récupère le "body" pour ajouter un fond rouge en cas d'erreur.
        this.body = document.querySelector("body");
    }

    getMessageElement() {
        // Récupère l'élément permettant d'afficher un message au joueur.
        this.message = document.getElementById("message");
    }
}