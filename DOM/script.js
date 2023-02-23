import Actions from "./js/actions.js";

/**
 * SCENARIO :
 * Sert de chef d'orchestre en lançant les actions selon le scénario du jeu et
 * déclenche les méthodes selon le tour de l'ordinateur et le tour du joueur.
 */
class Start extends Actions {
    constructor(props) {
        super(props);

        this.listeningClickEvents();
    }

    /**
     * Ecoute tout évènement "click" dans l'élément "playground".
     */
    listeningClickEvents() {
        this.playground.addEventListener("click", (e) => {
            this.dispatchAction(e.target)
        });
    }

    /**
     * Exécute l'action correspondant à l'élément cliqué.
     * @param {Element} el
     */
    dispatchAction(el) {
        // Vérifie si l'élément cliqué à une correspondance...
        switch (el) {
            // ...avec l'un des quartiers
            case this.quarters.find(quarter => el === quarter) :
                this.playerTurn(el);
                break;
            // ...avec le bouton "play"
            case this.playButton:
                this.computerTurn();
                break;
            // ...avec le bouton "reset"
            case this.resetButton:
                this.resetGame();
            default:
                break;
        }
    }
}

// Instancie une nouvelle partie.
const game = new Actions();
new Start(game);