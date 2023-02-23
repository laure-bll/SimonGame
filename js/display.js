import Init from "./init.js";

export const MESSAGES = {
    looser: "You lost this round, try again !",
    winner: "You win this round, get ready for the next level !",
    start: "Please, click the start button to start the game.",
    reset: "You reset the game ! Click the start button to try again."
}

/**
 * MANIPULATION DU DOM (setters):
 * Gère tout ce qui concerne la modification du texte et du style dans le DOM.
 */
export default class Display extends Init {
    constructor() {
        super();

        // Set les valeurs par défaut dans le DOM.
        this.updateDashBoard();
        this.updateCounter();
    }

    /**
     * Restaure toutes les valeurs par défaut.
     */
    restoreDefaultValues() {
        this.points = 0;
        this.level = 1;
        this.sequenceLength = 4;

        // Met à jour la vue avec les valeurs restaurées.
        this.updateDashBoard();
        this.updateCounter();
    }

    /**
     * Met à jour le compteur de séquence dans le DOM.
     * Sa valeur par défaut correspondant à la taille de la séquence.
     * @param {number | undefined} count
     */
    updateCounter(count) {
        this.counterElement.innerHTML = typeof count === "number" 
        ? count : this.sequenceLength;
    }

    /**
     * Met à jour les valeurs du tableau de bord dans le DOM :
     * - points
     * - niveau
     * - taille de la séquence.
     */
    updateDashBoard() {
        this.pointsElement.innerHTML = this.points;
        this.levelElement.innerHTML = this.level;
        this.sequenceElement.innerHTML = this.sequenceLength;
    }

    /**
     * Met en surbrillance un quartier pendant 1 seconde.
     * @param {Element} quarterElement 
     */
    highlightQuarter(quarterElement) {
        quarterElement.style.opacity = 0;
        setTimeout(() => quarterElement.style.opacity = 1, 200);
    }

    /**
     * Affiche un fond rouge alarmant pendant 3secondes.
     */
    alertWrongSequence() {
        this.body.classList.add("alert");
        this.displayMessage(MESSAGES.looser);
        setTimeout(() => this.body.classList.remove("alert"), 3000);
    }

    /**
     * Affiche le contenu du message informatif à l'attention du joueur.
     * @param {string} content
     */
    displayMessage(content) {
        this.message.style.visibility = "visible";
        this.message.innerHTML = content;
    }

    /**
     * Supprime le contenu du message informatif à l'attention du joueur.
     */
    removeMessage() {
        this.message.style.visibility = "hidden";
        this.message.innerHTML = "";
    }
}