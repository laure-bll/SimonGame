import Init from "./init.js";

export const MESSAGES = {
    looser: "Wrong, let's try again !",
    winner: "Well played, get ready for the next level !",
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
     */
    updateCounter() {
        this.counterElement.innerHTML = this.counter;
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
        this.displayRedBackground(true);
        this.displayMessage(MESSAGES.looser);
        setTimeout(() => this.displayRedBackground(false), 3000);
    }

    /**
     * Affiche ou supprime un fond rouge alarmant.
     * @param {boolean} show
     */
    displayRedBackground(show) {
        show ? this.body.classList.add("alert") : this.body.classList.remove("alert");
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

    /**
     * Inverse le bouton "start" et "reset" dans l'affichage.
     * @param {string: "start" | "reset"} btn
     */
    displayButton(btn) {
        if(btn === "start") {
            this.startButton.style.display = "initial"; 
            this.resetButton.style.display = "none";
        }

        if(btn === "reset") {
            this.resetButton.style.display = "initial"; 
            this.startButton.style.display = "none";
        }
    }
}