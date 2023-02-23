import Init from "./init.js";

/**
 * MANIPULATION DU DOM (setters):
 * Gère tout ce qui concerne la modification du texte et du style dans le DOM.
 */
export default class Display extends Init {
    constructor(props) {
        super(props);

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
        this.counterElement.innerHTML = typeof count === "number" ? count : this.sequenceLength;
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
}