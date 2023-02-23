import Display, { MESSAGES } from "./display.js";

/**
 * ACTIONS (moteur du jeu):
 * Contient chaque action du jeu de façon indépendante.
 * Elles sont appelées selon le scénario du jeu et les cliques du joueur.
 */
export default class Actions extends Display {
    constructor(props) {
        super(props);

        this.isGameStarted = false;
        this.isPlayerTurn = false;
        this.computerSequence = [];
        this.playerSequence = [];
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
            this.highlightQuarter(el),
            this.updateCounter(this.counter - 1),
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
            ? this.nextLevel() : this.alertWrongSequence();
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
        // Les séquences (joueur et ordinateur) sont réinitialisées.
        this.computerSequence = [];
        this.playerSequence = [];

        const intvl = setInterval(() => {
            const index = this.randomQuarter();

            this.highlightQuarter(this.quarters[index]);
            this.computerSequence.push(index);
            
            count === this.quarters.length - 1
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