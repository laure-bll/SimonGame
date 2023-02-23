import Game, { QUARTERS_COUNT } from "./game.js";

export default class Playing extends Game {
    constructor(props) {
        super(props);
    }

    playSequence() {
        const sequence = this.sequence.map(_ => this.randomQuarter());
    }

    /**
     * Génère un chiffre aléatoire entre 0 et 3 car il y a un maximum de 4 quartiers.
     * @returns number
     */
    randomQuarter() {
        return Math.floor(Math.random() * (max = QUARTERS_COUNT));
    }

    /**
     * Le joueur passe au niveau supérieur :
     * - incrémentation
     * - écriture dans le DOM.
     */
    nextLevel() {
        // Le joueur gagne 1 point pour avoir terminé le niveau précédent.
        this.points += 1;
        // Le niveau augment d'1 cran.
        this.level += 1;
        // La taille de la séquence s'allonge d'1 touche.
        this.sequence += 1;

        // Met à jour la vue avec les nouvelles valeurs.
        this.updateView();
    }

    /**
     * Restaure toutes les valeurs par défaut.
     */
    reset() {
        this.points = 0;
        this.level = 1;
        this.sequence = 4;

        // Met à jour la vue avec les valeurs restaurées.
        this.updateView();
    }

    /**
     * Met à jour les valeurs du tableau de bord dans le DOM :
     * - points
     * - niveau
     * - taille de la séquence
     */
    updateView() {
        this.pointsElement.innerHTML = this.points;
        this.levelElement.innerHTML = this.level;
        this.sequenceElement.innerHTML = this.sequence;
    }
}