import Display, { MESSAGES } from "./display.js";

/**
 * ACTIONS (moteur du jeu):
 * Contient chaque action du jeu de façon indépendante.
 * Elles sont appelées selon le scénario du jeu et les cliques du joueur.
 */
export default class Actions extends Display {
    constructor() {
        super();

        this.isGameStarted = false;
        this.isPlayerTurn = false;
        this.computerSequence = [];
        this.playerSequence = [];
        this.counter = this.sequenceLength;
    }

    /**
     * le joueur peut jouer, c'est-à-dire cliquer sur les cases, lorsque :
     * - le jeu a commencé (bouton "start" enclenché)
     * - la séquence a été montrée au joueur.
     *  
     * @param {Element} el
     */
    playerTurn(el) {
        this.isGameStarted ? this.isPlayerTurn && 
        (
            this.removeMessage(),
            this.highlightQuarter(el),
            this.counter && (this.counter -= 1),
            this.updateCounter(this.counter),
            this.compareSequence(el)
        )
        : this.displayMessage(MESSAGES.start);
    }

    /**
     * Compare la séquence du joueur à celle de l'ordinateur.
     * Si elles ne correspondent pas, affiche une alarme.
     * @param {Element} el
     */
    compareSequence(el) {
        const playerSeq = this.playerSequence;
        const computerSeq = this.computerSequence;

        playerSeq.push(this.quarters.indexOf(el));

        if(playerSeq.length === computerSeq.length) {
            JSON.stringify(playerSeq) === JSON.stringify(computerSeq)
            ? this.nextLevel() : (
                this.alertWrongSequence(),
                this.counter = this.sequenceLength,
                this.updateCounter(this.counter),
                setTimeout(() => this.playSequence(), 2000)
            );
        }
    }

    /**
     * L'ordinateur est toujours le 1er à jouer : il commence donc la partie.
     * Le tour du joueur est bloqué afin qu'il ne puisse pas effectuer d'action
     * durant le tour de l'ordinateur.
     */
    computerTurn() {
        if(!this.isGameStarted) {
            this.isGameStarted = true;
            this.removeMessage();
        }

        // La séquence de l'ordinateur est réinitialisée.
        this.computerSequence = [];
        this.isPlayerTurn = false;
        this.playSequence();
    }

    /**
     * Met en surbrillance les quartiers un à un avec une intervalle de 500ms.
     * La boucle est arrêtée quand le compteur a atteint la fin de la séquence.
     * A la fin de la séquence, le joueur peut jouer.
     */
    playSequence() {
        let count = 0;
        this.playerSequence = [];

        const intvl = setInterval(() => {
            const index = this.computerSequence.length === this.sequenceLength
            ? this.computerSequence[i] : this.randomQuarter();
            
            this.computerSequence.length !== this.sequenceLength 
            ? this.computerSequence.push(index) : null;

            this.highlightQuarter(this.quarters[index]);
            
            count ===( this.sequenceLength - 1)
            ? (clearInterval(intvl), (this.isPlayerTurn = true)) 
            : count += 1;
        }, 500);
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
        // Met à jour la vue avec les nouvelles valeurs.
        this.updateDashBoard();
        this.updateCounter();
        // L'ordinateur lance une nouvelle séquence.
        setTimeout(() => this.computerTurn(), 3000);
    }

    /**
     * Met fin à la partie en cours et restaure les valeurs par défaut.
     */
    resetGame() {
        if(this.isGameStarted) {
            this.displayMessage(MESSAGES.reset);
            this.isGameStarted = false;
            this.isPlayerTurn = false;
            this.restoreDefaultValues();
        }
    }
}