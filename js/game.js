import Init from "./init.js";

/**
 * Contient chaque action du jeu.
 * Elles sont appelées selon le scénario du jeu et les clics du joueur.
 */
export default class Game extends Init {
    constructor() {
        super();

        this.isGameStarted = false;
        this.isPlayerTurn = false;
        this.isRoundPassed = false;
        this.isPassingToTheNextLevel = false;
        this.playerSequence = [];
        this.computerSequence = [];
    }

    /**
     * le joueur peut jouer, c'est-à-dire cliquer sur les cases, lorsque :
     * - le jeu a commencé (bouton "start" enclenché)
     * - la séquence a été montrée au joueur.
     *  
     * @param {number} index
     *  @return {boolean}
     */
    playerTurn(selectedQuarter) {
        this.removeMessage();
        this.counter -= 1;
        return this.compareSequence(selectedQuarter);
    }

    /**
     * Compare la séquence du joueur à celle de l'ordinateur.
     * Si elles ne correspondent pas, affiche une alarme.
     * @param {number} index
     */
    compareSequence(selectedQuarter) {
        this.playerSequence.push(selectedQuarter);
        const seqPlayerLength = this.playerSequence.length - 1;
        const expectedQuarter = this.computerSequence[seqPlayerLength];
        const isWrong = selectedQuarter !== expectedQuarter;
        
        if(!isWrong) {
            this.counter = this.sequenceLength;
            this.playerSequence = [];
            this.isPlayerTurn = false;
        }

        return isWrong;
    }

    /**
     * L'ordinateur est toujours le 1er à jouer : il commence donc la partie.
     * Le tour du joueur est bloqué afin qu'il ne puisse pas effectuer d'action
     * durant le tour de l'ordinateur.
     */
    computerTurn() {
        this.computerSequence = [];
        this.removeMessage();
        this.playSequence();
    }

    /**
     * Crée une nouvelle séquence pour l'ordinateur.
     */
    createSequence() {
        this.isPlayerTurn = false;
        this.playerSequence = [];

        if(!this.computerSequence.length) {
            for(let i = 0; i < this.sequenceLength; i++) {
                this.computerSequence.push(this.randomQuarter());
            }
        }
    }

    /**
     * Génère un chiffre aléatoire entre 0 et 3 car le plateau a 4 cases.
     * @returns number
     */
    randomQuarter() {
        return Math.floor(Math.random() * this.quarters.length);
    }

    /**
     * Le joueur passe au niveau supérieur :
     * - incrémentation
     * - écriture dans le DOM.
     */
    nextLevel() {
        // Le joueur gagne 1 point pour avoir terminé le niveau précédent.
        this.points += 1;
        // Le niveau augmente d'1 cran.
        this.level += 1;
        // La taille de la séquence s'allonge d'1 touche.
        this.sequenceLength += 1;
        this.counter = this.sequenceLength;
        // L'ordinateur lance une nouvelle séquence.
        setTimeout(() => this.computerTurn(), 3000);
    }

    /**
     * Met fin à la partie en cours.
     */
    resetGame() {
        this.isGameStarted = false;
        this.isPlayerTurn = false;
    }
}