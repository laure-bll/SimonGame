import Display from "./display.js";

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
        this.sequence = [];
    }

    /**
     * le joueur peut jouer, c'est-à-dire cliquer sur les cases, lorsque le jeu a commencé (bouton "start" enclenché)
     * et que la séquence a été montrée au joueur. Il dispose de 60s pour faire sa séquence sinon il perd.
     * @param {Element} el
     */
    playerTurn(el) {
        this.isGameStarted ?
            this.isPlayerTurn && this.highlightQuarter(el) 
            : alert("Please click the start button to start the game !");
    }

    /**
     * 
     */
    compareSequence(sequence) {

    }

    /**
     * L'ordinateur est toujours le premier à jouer la séquence : la partie commence donc avec lui.
     * Le tour du joueur est bloqué afin qu'il ne puisse pas effectuer d'action quelle qu'elle soit
     * durant le tour de l'ordinateur.
     */
    computerTurn() {
        if(!this.isGameStarted) {
            this.isGameStarted = true;
        }

        this.isPlayerTurn = false;
        this.playSequence();
    }

    /**
     * Met en surbrillance les quartiers un à un avec une intervalle de 500ms par case.
     * La boucle est arrêtée une fois que le compteur a atteint la taille de la séquence.
     * A la fin de la séquence, le joueur peut jouer.
     */
    playSequence() {
        let count = 0;
        this.sequence = [];

        const intvl = setInterval(() => {
            const index = this.randomQuarter();

            this.highlightQuarter(this.quarters[index]);
            this.sequence.push(index);
            
            count === this.quarters.length - 1 
                ? (clearInterval(intvl), (this.isPlayerTurn = true)) 
                    : count += 1;
        }, 500);
    }

    /**
     * Génère un chiffre aléatoire entre 0 et 3 car il y a un maximum de 4 quartiers.
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
    }

    /**
     * Met fin à la partie en cours et restaure les valeurs par défaut.
     */
    reset() {
        this.isGameStarted = false;
        this.restoreDefaultValues();
    }
}